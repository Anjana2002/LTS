<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\TheatreRepository;
use App\Repository\ShowTimeRepository;
use App\Repository\MovieRepository;

final class ShowTimeController extends AbstractController
{
    #[Route('admin/showtime', name: 'admin_show_time')]
    public function index(): Response
    {
        return $this->render('show_time/index.html.twig');
    }
    #[Route('admin/showtime/add', name: 'add_show_time', methods: ['GET', 'POST'])]
    public function addShowTime(
        Request $request,
        ShowTimeRepository $showtimeRepo,
        MovieRepository $movieRepo,
        TheatreRepository $theatreRepo
    ): Response {
        $movies = $movieRepo->findAll();
        $theatres = $theatreRepo->findAll();

        if ($request->isMethod('POST')) {
            $movie = $movieRepo->find($request->request->get('movie_id'));
            $theatre = $theatreRepo->find($request->request->get('theatre_id'));
            $showTimeStr = $request->request->get('show_time');

            if ($movie && $theatre) {
                $showtimeRepo->createFromArray([
                    'movie' => $movie,
                    'theatre' => $theatre,
                    'show_time' => $showTimeStr
                ]);

                $this->addFlash('success', 'Show time added successfully!');
                return $this->redirectToRoute('add_show_time');
            } else {
                $this->addFlash('error', 'Invalid Movie or Theatre selected.');
            }
        }

        return $this->render('show_time/add_show.html.twig', [
            'movies' => $movies,
            'theatres' => $theatres,
        ]);
    }
}
