<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\TheatreRepository;

final class TheatreController extends AbstractController
{
    #[Route('admin/theatre', name: 'admin_theatre')]
    public function index(): Response
    {
        return $this->render('theatre/index.html.twig');
    }

    #[Route('admin/theatre/add', name: 'add_theatre')]
    public function addTheatre(Request $request, TheatreRepository $theatreRepository): Response
    {
        if ($request->isMethod('POST')) {
            $data = $request->request->all();

            $theatre = $theatreRepository->createFromArray($data);

            $this->addFlash('success', 'Theatre added successfully!');

            return $this->redirectToRoute('admin_theatre');
        }

        return $this->render('theatre/addtheatre.html.twig');
    }

    #[Route('admin/theatre/view', name: 'view_theatre')]
    public function viewTheatre(TheatreRepository $theatreRepository): Response
    {
        $theatres = $theatreRepository->findAllTheatres();

        return $this->render('theatre/viewtheatre.html.twig', [
            'theatres' => $theatres
        ]);
    }
}
