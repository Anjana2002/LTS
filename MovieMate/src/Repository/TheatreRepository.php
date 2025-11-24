<?php

namespace App\Repository;

use App\Entity\Theatre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class TheatreRepository extends ServiceEntityRepository
{
    private $em;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Theatre::class);
        $this->em = $this->getEntityManager();
    }

    public function createFromArray(array $data): Theatre
    {
        $theatre = new Theatre();
        $theatre->setName($data['name'] ?? '');
        $theatre->setLocation($data['location'] ?? '');
        $theatre->setTotalSeats((int)($data['totalSeats'] ?? 0));
        $theatre->setTicketPrice((float)($data['ticketPrice'] ?? 0));



        $this->em->persist($theatre);
        $this->em->flush();

        return $theatre;
    }
    public function findAllTheatres(): array
    {
        return $this->createQueryBuilder('t')
            ->orderBy('t.id', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
