<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Item;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\ItemRepository;


final class ItemController extends AbstractController
{
    #[Route('/items', methods: ['POST'])]
    public function addItem(Request $request, ItemRepository $repo)
    {
        $item = new Item();

        $item->setName($request->get('name'));
        $item->setPrice((int)$request->get('price'));
        $item->setDescription($request->get('description'));

        $file = $request->files->get('itemImage');

        if ($file) {
            $fileName = uniqid() . '.' . $file->guessExtension();
            $file->move(
                $this->getParameter('kernel.project_dir') . '/public/uploads/',
                $fileName
            );
            $item->setItemImage($fileName);

        }


        $repo->save($item, true);

        return $this->json($item);
    }
    #[Route('/items', methods: ['GET'])]
    public function getItems(ItemRepository $repo)
    {
        $items = $repo->findAll();
        return $this->json($items);
    }
}
