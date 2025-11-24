<?php

namespace App\Repository;

use App\Entity\ShowTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Theatre;

/**
 * @extends ServiceEntityRepository<ShowTime>
 */
class ShowTimeRepository extends ServiceEntityRepository
{
    private $em;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ShowTime::class);
        $this->em = $this->getEntityManager();
    }
    public function add(ShowTime $showTime, bool $flush = false): void
    {
        $this->em->persist($showTime);
        if ($flush) {
            $this->em->flush();
        }
    }
    public function createFromArray(array $data): ?ShowTime
    {
        try {
            $showTime = new ShowTime();
            $showTime->setMovie($data['movie']);
            $showTime->setTheatre($data['theatre']);
            $showTime->setShowTime(new \DateTime($data['show_time']));
            $showTime->initializeAvailableSeats();
            $this->em->persist($showTime);
            $this->em->flush();

            return $showTime;
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findAllShowTimes(): array
    {
        return $this->findBy([], ['showTime' => 'ASC']);
    }

    public function findUniqueTheatresByMovie(int $movieId): array
    {
        $qb = $this->getEntityManager()->createQueryBuilder();

        $qb->select('t')
            ->from(Theatre::class, 't')
            ->innerJoin(ShowTime::class, 's', 'WITH', 's.theatre = t.id')
            ->where('s.movie = :movieId')
            ->setParameter('movieId', $movieId)
            ->groupBy('t.id')
            ->orderBy('t.name', 'ASC');

        return $qb->getQuery()->getResult();
    }


    public function findShowTimesByMovieAndTheatre(int $movieId, int $theatreId): array
    {
        return $this->createQueryBuilder('s')
            ->where('s.movie = :movieId')
            ->andWhere('s.theatre = :theatreId')
            ->setParameter('movieId', $movieId)
            ->setParameter('theatreId', $theatreId)
            ->orderBy('s.showTime', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
