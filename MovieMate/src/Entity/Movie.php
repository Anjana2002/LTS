<?php

namespace App\Entity;

use App\Repository\MovieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MovieRepository::class)]
class Movie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $cast = null;


    #[ORM\Column(length: 255)]
    private ?string $director = null;

    #[ORM\Column(length: 200)]
    private ?string $genre = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $release_date = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $end_date = null;

    // #[ORM\Column(type: Types::TIME_MUTABLE)]
    // private ?\DateTime $duration = null;
    #[ORM\Column(type: Types::INTEGER)]
    private ?int $duration = null;


    #[ORM\Column(length: 255)]
    private ?string $poster = null;

    /**
     * @var Collection<int, ShowTime>
     */
    #[ORM\OneToMany(targetEntity: ShowTime::class, mappedBy: 'movie')]
    private Collection $showTimes;

    public function __construct()
    {
        $this->showTimes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getCast(): ?string
    {
        return $this->cast;
    }

    public function setCast(?string $cast): static
    {
        $this->cast = $cast;

        return $this;
    }

    public function getDirector(): ?string
    {
        return $this->director;
    }

    public function setDirector(string $director): static
    {
        $this->director = $director;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(string $genre): static
    {
        $this->genre = $genre;

        return $this;
    }

    public function getReleaseDate(): ?\DateTime
    {
        return $this->release_date;
    }

    public function setReleaseDate(\DateTime $release_date): static
    {
        $this->release_date = $release_date;

        return $this;
    }

    public function getEndDate(): ?\DateTime
    {
        return $this->end_date;
    }

    public function setEndDate(\DateTime $end_date): static
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;
        return $this;
    }

    public function getPoster(): ?string
    {
        return $this->poster;
    }

    public function setPoster(string $poster): static
    {
        $this->poster = $poster;

        return $this;
    }

    /**
     * @return Collection<int, ShowTime>
     */
    public function getShowTimes(): Collection
    {
        return $this->showTimes;
    }

    public function addShowTime(ShowTime $showTime): static
    {
        if (!$this->showTimes->contains($showTime)) {
            $this->showTimes->add($showTime);
            $showTime->setMovie($this);
        }

        return $this;
    }

    public function removeShowTime(ShowTime $showTime): static
    {
        if ($this->showTimes->removeElement($showTime)) {
            // set the owning side to null (unless already changed)
            if ($showTime->getMovie() === $this) {
                $showTime->setMovie(null);
            }
        }

        return $this;
    }
}
