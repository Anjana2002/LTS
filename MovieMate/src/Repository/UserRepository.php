<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserRepository extends ServiceEntityRepository
{
    private $em;
    private $passwordHasher;

    public function __construct(ManagerRegistry $registry, UserPasswordHasherInterface $passwordHasher)
    {
        parent::__construct($registry, User::class);
        $this->em = $this->getEntityManager();
        $this->passwordHasher = $passwordHasher;
    }

    public function createFromArray(array $data): User
    {
        $user = new User();
        $user->setName($data['name'] ?? '');
        $user->setUsername($data['username'] ?? '');
        $user->setEmail($data['email'] ?? '');
        $user->setPassword($this->passwordHasher->hashPassword($user, $data['password'] ?? ''));
        $user->setRoles(['ROLE_USER']);
        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }

    public function existsByUsernameOrEmail(string $username, string $email): bool
    {
        $qb = $this->createQueryBuilder('u')
            ->select('count(u.id)')
            ->where('u.username = :username OR u.email = :email')
            ->setParameter('username', $username)
            ->setParameter('email', $email);

        return (int) $qb->getQuery()->getSingleScalarResult() > 0;
    }
    public function verifyLogin(string $username, string $plainPassword): ?User
    {
        $user = $this->findOneBy(['username' => $username]);

        if (!$user) {
            return null;
        }

        if (!$this->passwordHasher->isPasswordValid($user, $plainPassword)) {
            return null;
        }

        return $user;
    }
}
