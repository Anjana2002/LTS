<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Repository\MovieRepository;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(Request $request, MovieRepository $movieRepository): Response
    {
        $movies = $movieRepository->findAllMovies();
        return $this->render('home/index.html.twig', [
            'movies' => $movies,
        ]);
    }

    #[Route('/register', name: 'app_register', methods: ['GET', 'POST'])]
    public function register(Request $request, UserRepository $repo): Response
    {
        if ($request->isMethod('POST')) {
            $username = $request->request->get('username');
            $email = $request->request->get('email');

            if ($repo->existsByUsernameOrEmail($username, $email)) {
                $this->addFlash('error', 'Username or email already exists!');
                return $this->redirectToRoute('app_register');
            }
            $userData = [
                'name' => $request->request->get('name'),
                'username' => $username,
                'email' => $email,
                'password' => $request->request->get('password'),
            ];

            $repo->createFromArray($userData);
            $this->addFlash('success', 'Registration successful! You can now log in.');
            return $this->redirectToRoute('app_home');
        }
        return $this->render('home/register.html.twig');
    }

    // #[Route('/login', name: 'app_login', methods: ['GET','POST'])]
    // public function login(Request $request, UserRepository $repo): Response
    // {
    //     $message = null; 

    //     if ($request->isMethod('POST')) {
    //         $username = $request->request->get('_username');
    //         $password = $request->request->get('_password');
    //         $user = $repo->verifyLogin($username, $password);

    //         if (!$user) {
    //             $message = ['type' => 'error', 'text' => 'Invalid username or password.'];
    //         } else {
    //             $session = $request->getSession();
    //             $session->set('user_id', $user->getId());
    //             $session->set('username', $user->getUsername());
    //             $session->set('roles', $user->getRoles());                  
    //             $message = ['type' => 'success', 'text' => 'Login successful! Welcome ' . $user->getUsername()];

    //             if (in_array('ROLE_ADMIN', $user->getRoles())) {
    //                 return $this->redirectToRoute('admin_home');
    //             } else {
    //                 return $this->redirectToRoute('user_home', ['userId' => $user->getId()]); 
    //             }
    //         }
    //     }
    //     return $this->render('home/login.html.twig', [
    //         'last_username' => $request->request->get('_username', ''),
    //         'message' => $message
    //     ]);
    // }
    //     #[Route('/login', name: 'app_login', methods: ['GET','POST'])]
    // public function login(Request $request, UserRepository $repo): Response
    // {
    //     $message = null;

    //     if ($request->isMethod('POST')) {

    //         $username = trim($request->request->get('_username'));
    //         $password = $request->request->get('_password');

    //         $user = $repo->verifyLogin($username, $password);

    //         if (!$user) {
    //             $message = ['type' => 'error', 'text' => 'Invalid username or password.'];
    //         } else {

    //             // Symfony session handling
    //             $session = $request->getSession();
    //             $session->set('user_id', $user->getId());
    //             $session->set('username', $user->getUsername());
    //             $session->set('roles', $user->getRoles());

    //             $message = [
    //                 'type' => 'success',
    //                 'text' => 'Login successful! Welcome ' . $user->getUsername()
    //             ];

    //             // Redirect by role
    //             if (in_array('ROLE_ADMIN', $user->getRoles())) {
    //                 return $this->redirectToRoute('admin_home');
    //             }

    //             return $this->redirectToRoute('user_home', ['userId' => $user->getId()]);
    //         }
    //     }

    //     return $this->render('home/login.html.twig', [
    //         'last_username' => $request->request->get('_username', ''),
    //         'message' => $message,
    //     ]);
    // }
    #[Route('/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        return $this->render('home/login.html.twig', [
            'last_username' => $authenticationUtils->getLastUsername(),
            'error' => $authenticationUtils->getLastAuthenticationError()
        ]);
    }


    #[Route('/logout', name: 'app_logout')]
    public function logout(Request $request): Response
    {
        $session = $request->getSession();
        $session->clear();
        $session->invalidate();

        $this->addFlash('success', 'You have been logged out successfully!');
        return $this->redirectToRoute('app_home');
    }

    #[Route('/about', name: 'app_about')]
    public function about(Request $resquest): Response
    {
        return $this->render('home/about.html.twig');
    }
    #[Route('/upcoming', name: 'app_upcoming')]
    public function upcoming(MovieRepository $movieRepository): Response
    {
        $upcomingmovies = $movieRepository->findUpcomingMovies();
        return $this->render('home/upcoming.html.twig', [
            'movies' => $upcomingmovies,
        ]);
    }
}
