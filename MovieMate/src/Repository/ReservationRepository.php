<?php

namespace App\Repository;

use App\Entity\Reservation;
use App\Entity\ShowTime;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ReservationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reservation::class);
    }

    public function bookSeats(int $showtimeId, array $seats, User $user): bool
    {
        $em = $this->getEntityManager();
        $showtime = $em->getRepository(ShowTime::class)->find($showtimeId);

        if (!$showtime) {
            throw new \Exception('Showtime not found.');
        }
        $booked = [];
        foreach ($showtime->getReservations() as $res) {
            if ($res->getSelectedSeats()) {
                $booked = array_merge($booked, explode(',', $res->getSelectedSeats()));
            }
        }

        foreach ($seats as $seat) {
            if (in_array((string)$seat, $booked, true)) {
                throw new \Exception("Seat {$seat} is already booked.");
            }
        }

        $available = $showtime->getAvailableSeats();
        $count = count($seats);

        if ($available < $count) {
            throw new \Exception('Not enough seats available.');
        }
        $showtime->setAvailableSeats($available - $count);
        $em->persist($showtime);
        $reservation = new Reservation();
        $reservation->setShowId($showtime);
        $reservation->setUser($user);
        $reservation->setNoSeats($count);
        $reservation->setSelectedSeats(implode(',', $seats));
        $ticketPrice = $showtime->getTheatre()->getTicketPrice() ?? 0;
        $reservation->setTotalPrice($count * $ticketPrice);

        $em->persist($reservation);
        $em->flush();

        return true;
    }
}
