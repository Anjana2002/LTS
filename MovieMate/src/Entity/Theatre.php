<?php

namespace App\Entity;

use App\Repository\TheatreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TheatreRepository::class)]
class Theatre
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 200)]
    private ?string $location = null;

    #[ORM\Column]
    private ?int $totalSeats = null;

    #[ORM\Column]
    private ?int $ticketPrice = null;


    /**
     * @var Collection<int, ShowTime>
     */
    #[ORM\OneToMany(targetEntity: ShowTime::class, mappedBy: 'theatre')]
    private Collection $showTimes;

    public function __construct()
    {
        $this->showTimes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function getTotalSeats(): ?int
    {
        return $this->totalSeats;
    }

    public function setTotalSeats(int $totalSeats): static
    {
        $this->totalSeats = $totalSeats;

        return $this;
    }

    public function getTicketPrice(): ?int
    {
        return $this->ticketPrice;
    }

    public function setTicketPrice(int $ticketPrice): static
    {
        $this->ticketPrice = $ticketPrice;

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
            $showTime->setTheatre($this);
        }

        return $this;
    }

    public function removeShowTime(ShowTime $showTime): static
    {
        if ($this->showTimes->removeElement($showTime)) {
            // set the owning side to null (unless already changed)
            if ($showTime->getTheatre() === $this) {
                $showTime->setTheatre(null);
            }
        }

        return $this;
    }
}
