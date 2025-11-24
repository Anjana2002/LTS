<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    private $passwordHasher;
    public function __construct(ManagerRegistry $registry, UserPasswordHasherInterface $passwordHasher)
    {
        parent::__construct($registry, User::class);
        $this->passwordHasher = $passwordHasher;
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }
    public function registerUser(array $data, $photo = null): User
    {
        $user = new User();
        $user->setName($data['name']);
        $user->setEmail($data['email']);
        $user->setDateofBirth(new \DateTime($data['dateOfBirth']));
        $user->setLocation($data['location'] ?? null);
        $newHashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($newHashedPassword);

        if ($photo) {
            $uploadsDir = __DIR__ . '/../../public/uploads';
            $newFilename = uniqid() . '.' . $photo->guessExtension();
            $photo->move($uploadsDir, $newFilename);
            $user->setProfilePhoto('/uploads/' . $newFilename);
        }
        $em = $this->getEntityManager();
        $em->persist($user);
        $em->flush();
        return $user;
    }
    public function findByEmail(string $email): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }
    public function getUserProfile(int $userId): array
    {
        return $this->createQueryBuilder('u')
            ->select('u.id, u.name, u.email, u.dateOfBirth, u.location, u.profilePhoto')
            ->andWhere('u.id = :id')
            ->setParameter('id', $userId)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
