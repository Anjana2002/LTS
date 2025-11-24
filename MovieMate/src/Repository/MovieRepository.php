<?php

namespace App\Repository;

use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @extends ServiceEntityRepository<Movie>
 */
class MovieRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $em;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        parent::__construct($registry, Movie::class);
        $this->em = $em;
    }
    public function createFromArray(array $data, ?object $posterFile = null): ?Movie
    {
        return $this->setMovieData(new Movie(), $data, $posterFile);
    }
    public function updateFromArray(Movie $movie, array $data, ?object $posterFile = null): ?Movie
    {
        return $this->setMovieData($movie, $data, $posterFile);
    }
    public function setMovieData(Movie $movie, array $data, ?object $posterFile = null): ?Movie
    {
        try {
            $movie->setTitle($data['title'] ?? '');
            $movie->setDirector($data['director'] ?? '');
            $movie->setCast($data['cast'] ?? '');
            $movie->setGenre($data['genre'] ?? '');
            $movie->setReleaseDate(new \DateTime($data['release_date'] ?? 'now'));
            $movie->setEndDate(new \DateTime($data['end_date'] ?? 'now'));
            $movie->setDuration((int)($data['duration'] ?? 0));
            if ($posterFile) {
                $newFilename = uniqid() . '.' . $posterFile->guessExtension();
                $posterFile->move(
                    dirname(__DIR__, 2) . '/public/uploads',
                    $newFilename
                );
                $movie->setPoster('/uploads/' . $newFilename);
            }

            $this->em->persist($movie);
            $this->em->flush();

            return $movie;
        } catch (\Exception $e) {
            return null;
        }
    }
    public function findAllMovies(): array
    {
        return $this->findBy([], ['id' => 'DESC']);
    }

    /**
     * Undocumented function
     *
     * @param integer $id
     * @return Movie|null
     */
    public function findMovieById(int $id): ?Movie
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * Delete movie by id
     *
     * @param integer $id
     * @return boolean
     */
    public function deleteById(int $id): bool
    {
        $movie = $this->find($id);
        if (!$movie) {
            return false;
        }

        try {
            $this->em->remove($movie);
            $this->em->flush();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Find all upcoming movies.
     *
     * @return Movie[]
     */
    public function findUpcomingMovies(): array
    {
        $today = new \DateTime();
        $today->setTime(0, 0, 0);
        return $this->createQueryBuilder('m')
            ->where('m.release_date> :today')
            ->setParameter('today', $today)
            ->orderBy('m.release_date', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
