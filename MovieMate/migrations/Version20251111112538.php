<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251111112538 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE show_time (id INT AUTO_INCREMENT NOT NULL, movie_id INT NOT NULL, theatre_id INT NOT NULL, show_time DATETIME NOT NULL, INDEX IDX_B3634E868F93B6FC (movie_id), INDEX IDX_B3634E86C80060CD (theatre_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE show_time ADD CONSTRAINT FK_B3634E868F93B6FC FOREIGN KEY (movie_id) REFERENCES movie (id)');
        $this->addSql('ALTER TABLE show_time ADD CONSTRAINT FK_B3634E86C80060CD FOREIGN KEY (theatre_id) REFERENCES theatre (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE show_time DROP FOREIGN KEY FK_B3634E868F93B6FC');
        $this->addSql('ALTER TABLE show_time DROP FOREIGN KEY FK_B3634E86C80060CD');
        $this->addSql('DROP TABLE show_time');
    }
}
