<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\MovieRepository;
use App\Repository\ShowTimeRepository;
use App\Repository\ReservationRepository;
use App\Entity\ShowTime;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository;
use Symfony\Bundle\SecurityBundle\Security;


final class BookingController extends AbstractController
{
    #[Route('/booking/{id}', name: 'app_booking', methods: ['GET'])]
    public function index(MovieRepository $movieRepository, ShowTimeRepository $showTimeRepository,  Security $security, int $id): Response
    {
        $user = $security->getUser();
        $movie = $movieRepository->findMovieById($id);
        if (!$movie) {
            throw $this->createNotFoundException('Movie not found');
        }
        $showTimes = $showTimeRepository->findUniqueTheatresByMovie($id);
        return $this->render('booking/index.html.twig', [
            'movie' => $movie,
            'showTimes' => $showTimes,
        ]);
    }

    #[Route('{/booking/{movieId}/theatre/{theatreId}', name: 'app_booking_theatre', methods: ['GET'])]
    public function theatreBooking(MovieRepository $movieRepository, ShowTimeRepository $showTimeRepository,  int $movieId, int $theatreId): Response
    {
        $movie = $movieRepository->findMovieById($movieId);
        if (!$movie) {
            throw $this->createNotFoundException('Movie not found');
        }
        $showTimes = $showTimeRepository->findShowTimesByMovieAndTheatre($movieId, $theatreId);
        $bookedSeats = [];
        foreach ($showTimes as $show) {
            $showId = $show->getId();
            $bookedSeats[$showId] = [];

            foreach ($show->getReservations() as $reservation) {
                if ($reservation->getSelectedSeats()) {
                    $bookedSeats[$showId] = array_merge(
                        $bookedSeats[$showId],
                        explode(',', $reservation->getSelectedSeats())
                    );
                }
            }
        }
        return $this->render('booking/booking.html.twig', [
            'movie' => $movie,
            'showTimes' => $showTimes,
            'bookedSeats' => $bookedSeats,
        ]);
    }
    #[Route('/book-seats', name: 'app_book_seats', methods: ['POST'])]
    public function bookSeats(Request $request, ReservationRepository $reservationRepo, UserRepository $userRepo, Security $security): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $showtimeId = (int)($data['showtimeId'] ?? 0);
            $seats = $data['seats'] ?? [];
            if (!$showtimeId || empty($seats)) {
                return $this->json(['success' => false, 'message' => 'Invalid request']);
            }
            $user = $security->getUser();
            if (!$user) {
                return $this->json(['success' => false, 'message' => 'User not logged in']);
            }
            $reservationRepo->bookSeats($showtimeId, $seats, $user);
            return $this->json(['success' => true]);
        } catch (\Throwable $e) {
            return $this->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    #[Route('/my-tickets', name: 'app_my_tickets')]
    public function myTickets(ReservationRepository $reservationRepo, Security $security): Response
    {
        $user = $security->getUser();
        $tickets = $reservationRepo->findBy(['user' => $user]);

        return $this->render('user/my_tickets.html.twig', [
            'tickets' => $tickets,
        ]);
    }
}
