<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

final class RegisterController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods:['POST'])]
    public function register(Request $request, UserRepository $userRepository): JsonResponse
    {
        $name = $request->request->get('name');
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $dateOfBirth = $request->request->get('dateOfBirth');
        $location = $request->request->get('location');
        $profilePhoto = $request->files->get('profilePhoto');
        if (!$name || !$email || !$password || !$dateOfBirth) {
            return new JsonResponse(['message' => 'Please fill all required fields'], 400);
        }
        $user = $userRepository->registerUser([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'dateOfBirth' => $dateOfBirth,
            'location' => $location
        ], $profilePhoto);

     return new JsonResponse(['message' => 'User registered successfully', 'userId' => $user->getId()], 201);
    }
}
