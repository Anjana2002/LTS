<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\User; 
use App\Entity\ShowTime;
#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?showtime $show_id = null;

    #[ORM\Column]
    private ?int $no_seats = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $selectedSeats = null;


    #[ORM\Column]
    private ?int $totalPrice = null;

    // #[ORM\ManyToOne(inversedBy: 'reservations')]
    // #[ORM\JoinColumn(nullable: false)]
    // private ?User $user = null;                                                                                                
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getShowId(): ?showtime
    {
        return $this->show_id;
    }

    public function setShowId(?showtime $show_id): static
    {
        $this->show_id = $show_id;

        return $this;
    }

    public function getNoSeats(): ?int
    {
        return $this->no_seats;
    }

    public function setNoSeats(int $no_seats): static
    {
        $this->no_seats = $no_seats;

        return $this;
    }

    public function getTotalPrice(): ?int
    {
        return $this->totalPrice;
    }

    public function setTotalPrice(int $totalPrice): static
    {
        $this->totalPrice = $totalPrice;

        return $this;
    }
    public function getSelectedSeats(): ?string
    {
        return $this->selectedSeats;
    }

    public function setSelectedSeats(?string $selectedSeats): static
    {
        $this->selectedSeats = $selectedSeats;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
