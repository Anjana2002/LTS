<?php

namespace App\Entity;

use App\Repository\ShowTimeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Movie;
use App\Entity\Theatre;

#[ORM\Entity(repositoryClass: ShowTimeRepository::class)]
class ShowTime
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'showTimes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?movie $movie = null;

    #[ORM\ManyToOne(inversedBy: 'showTimes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?theatre $theatre = null;

    #[ORM\Column]
    private ?\DateTime $showTime = null;

    #[ORM\Column]
    private ?int $availableSeats = null;

    /**
     * @var Collection<int, Reservation>
     */
    #[ORM\OneToMany(targetEntity: Reservation::class, mappedBy: 'show_id')]
    private Collection $reservations;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMovie(): ?movie
    {
        return $this->movie;
    }

    public function setMovie(?movie $movie): static
    {
        $this->movie = $movie;

        return $this;
    }

    public function getTheatre(): ?theatre
    {
        return $this->theatre;
    }

    public function setTheatre(?theatre $theatre): static
    {
        $this->theatre = $theatre;

        return $this;
    }

    public function getShowTime(): ?\DateTime
    {
        return $this->showTime;
    }

    public function setShowTime(\DateTime $showTime): static
    {
        $this->showTime = $showTime;

        return $this;
    }

    public function getAvailableSeats(): ?int
    {
        return $this->availableSeats;
    }

    public function setAvailableSeats(?int $availableSeats): static
    {
        $this->availableSeats = $availableSeats;
        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setShowId($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getShowId() === $this) {
                $reservation->setShowId(null);
            }
        }

        return $this;
    }
    public function initializeAvailableSeats(): static
    {
        if ($this->availableSeats === null && $this->theatre) {
            $this->availableSeats = $this->theatre->getTotalSeats();
        }
        return $this;
    }
}
