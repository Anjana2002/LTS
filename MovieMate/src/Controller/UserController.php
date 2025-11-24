<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\MovieRepository;

final class UserController extends AbstractController
{
    #[Route('/user', name: 'user_home')]
    public function index(Request $request, MovieRepository $movieRepository): Response
    {
        $movies = $movieRepository->findAllMovies();
        return $this->render('user/index.html.twig', [
            'movies' => $movies,
        ]);
    }
}
