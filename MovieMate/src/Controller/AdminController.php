<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\MovieRepository;

final class AdminController extends AbstractController
{
    #[Route('/admin', name: 'admin_home')]
    public function index(MovieRepository $movieRepository): Response
    {
        $movies = $movieRepository->findAllMovies();

        return $this->render('admin/index.html.twig', [
            'movies' => $movies,
        ]);
    }

    #[Route('admin/movies', name: 'admin_movies')]
    public function manageMovies(): Response
    {
        return $this->render('admin/movies.html.twig');
    }

    #[Route('admin/movies/add', name: 'add_movies', methods: ['GET', 'POST'])]
    public function addMovies(Request $request, MovieRepository $movieRepository): Response
    {
        if ($request->isMethod('POST')) {
            $movie = $movieRepository->createFromArray(
                $request->request->all(),
                $request->files->get('poster')
            );
            $this->addFlash(
                $movie ? 'success' : 'error',
                $movie ? 'Movie added successfully!' : 'Failed to add movie.'
            );
            return $this->redirectToRoute('add_movies');
        }
        return $this->render('admin/addmovies.html.twig');
    }

    #[Route('admin/movies/edit/', name: 'edit_movies', methods: ['GET'])]
    public function editMovies(Request $request, MovieRepository $movieRepository): Response
    {
        $movies = $movieRepository->findAllMovies();

        return $this->render('admin/editmovies.html.twig', [
            'movies' => $movies,
        ]);
    }

    #[Route('admin/movies/edit/movie/{id}', name: 'edit_form', methods: ['GET', 'POST'])]
    public function editMovieForm(Request $request, MovieRepository $movieRepository, int $id): Response
    {
        $movie = $movieRepository->find($id);
        if (!$movie) {
            $this->addFlash('error', 'Movie not found.');
            return $this->redirectToRoute('edit_movies');
        }
        if ($request->isMethod('POST')) {
            $updatedMovie = $movieRepository->updateFromArray($movie, $request->request->all(), $request->files->get('poster'));
            $this->addFlash(
                $updatedMovie ? 'success' : 'error',
                $updatedMovie ? 'Movie updated successfully!' : 'Failed to update movie.'
            );
            return $this->redirectToRoute('edit_movies');
        }
        return $this->render('admin/editmovieform.html.twig', [
            'movie' => $movie,
        ]);
    }
    #[Route('admin/movies/delete/', name: 'delete_movies', methods: ['GET'])]
    public function deleteMovies(MovieRepository $movieRepository): Response
    {
        $movies = $movieRepository->findAllMovies();

        return $this->render('admin/deletemovie.html.twig', [
            'movies' => $movies,
        ]);
    }
    #[Route('admin/movies/delete/{id}', name: 'delete_form', methods: ['GET'])]
    public function deleteMovie(MovieRepository $movieRepository, int $id): Response
    {
        $deleted = $movieRepository->deleteById($id);

        $this->addFlash($deleted ? 'success' : 'error', $deleted ? 'Movie deleted successfully!' : 'Failed to delete movie.');

        return $this->redirectToRoute('delete_movies');
    }
}
