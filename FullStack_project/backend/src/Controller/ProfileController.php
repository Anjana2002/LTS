<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

final class ProfileController extends AbstractController
{
    #[Route('/profile', methods: ['GET'])]
public function profile(UserRepository $userRepository): JsonResponse
{
    /** @var User $loggedInUser */
    $loggedInUser = $this->getUser();

    if (!$loggedInUser) {
        return new JsonResponse(['error' => 'Unauthorized'], 401);
    }

    $user = $userRepository->getUserProfile($loggedInUser->getId());

    if (!$user) {
        return new JsonResponse(['error' => 'User not found'], 404);
    }

    return new JsonResponse($user, 200);
}

}
