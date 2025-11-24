<?php

namespace App\Controller;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class SigninController extends AbstractController
{
    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        $email =$request->request->get('email');
        $password = $request->request->get('password');
        if (!$email || !$password) {
            return new JsonResponse(['message' => 'Please provide email and password'], 400);
        }
        $user = $userRepository->findByEmail($email);
        if (!$user) {
            return new JsonResponse(['message' => 'Invalid credentials'], 401);
        }
        if (!$passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['message' => 'Invalid credentials'], 401);
        }
        $token = $jwtManager->create($user);
        return new JsonResponse(['message' => 'Login successful', 'token' => $token], 200);
    }
    
}
