import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCardService from '@modules/card/services/CreateCardService';
import UpdateCardService from '@modules/card/services/UpdateCardService';
import DeleteCardService from '@modules/card/services/DeleteCardService';

import ListCardsByTypeService from '@modules/card/services/ListCardsByTypeService';
import ListCardsByPriceRangeService from '@modules/card/services/ListCardsByPriceRangeService';
import ListCardsByTypeAndPriceRangeService from '@modules/card/services/ListCardsByTypeAndPriceRangeService';
import ListCardsService from '@modules/card/services/ListCardsService';

export default class CardsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, type, price } = request.body;

      const createCard = container.resolve(CreateCardService);

      const card = await createCard.execute({
        name,
        type,
        price,
      });

      return response.json(card);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { type, price, option } = request.query;

      // if (type && price && option === undefined) {
      // }

      if (type !== undefined && price === undefined) {
        const listCards = container.resolve(ListCardsByTypeService);

        const allCardsByFoodType = await listCards.execute({
          option: String(option),
          type: String(type),
        });

        return response.json(allCardsByFoodType);
      }

      if (type === undefined && price !== undefined) {
        const parsedPrice = String(price)
          .split(',')
          .map(item => Number(item.trim()));

        const listCards = container.resolve(ListCardsByPriceRangeService);

        const allCardsByPriceRange = await listCards.execute({
          option: String(option),
          minPrice: parsedPrice[0],
          maxPrice: parsedPrice[1],
        });

        return response.json(allCardsByPriceRange);
      }

      if (type !== undefined && price !== undefined) {
        const parsedPrice = String(price)
          .split(',')
          .map(item => Number(item.trim()));

        const listCards = container.resolve(
          ListCardsByTypeAndPriceRangeService,
        );

        const allCardsByTypeAndPriceRange = await listCards.execute({
          option: String(option),
          type: String(type),
          minPrice: parsedPrice[0],
          maxPrice: parsedPrice[1],
        });

        return response.json(allCardsByTypeAndPriceRange);
      }

      const listAllCards = container.resolve(ListCardsService);

      const allCards = await listAllCards.execute();

      return response.json(allCards);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const removeCard = container.resolve(DeleteCardService);

      await removeCard.execute(id);

      return response.status(204).json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, type, price, ...rest } = request.body;

      const card = { id, name, type, price, ...rest };

      const updateCard = container.resolve(UpdateCardService);

      const updatedCard = await updateCard.execute(card);

      return response.json(updatedCard);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}