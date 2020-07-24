/* eslint-disable no-case-declarations */
import { getRepository, Repository, Between } from 'typeorm';

import ICardsRepository from '@modules/card/repositories/ICardsRepository';
import ICreateCardDTO from '@modules/card/dtos/ICreateCardDTO';

import IFindCardByFoodTypeDTO from '@modules/card/dtos/IFindCardByFoodTypeDTO';
import IFindCardByPriceRangeDTO from '@modules/card/dtos/IFindCardByPriceRangeDTO';
import IFindCardByTypeAndPriceRangeDTO from '@modules/card/dtos/IFindCardByTypeAndPriceRangeDTO';

import Cards from '../entities/Cards';

class CardsRepository implements ICardsRepository {
  private ormRepository: Repository<Cards>;

  constructor() {
    this.ormRepository = getRepository(Cards);
  }

  public async createAndSave({
    name,
    type,
    price,
  }: ICreateCardDTO): Promise<Cards> {
    try {
      const card = this.ormRepository.create({ name, price, type });

      await this.ormRepository.save(card);

      return card;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async listAllCards(): Promise<Cards[]> {
    try {
      const allCards = await this.ormRepository.find();

      return allCards;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async listCardsByFoodType({
    option,
    type,
  }: IFindCardByFoodTypeDTO): Promise<Cards[] | undefined> {
    try {
      switch (option) {
        case 'ASC':
          const allCardsByFoodTypeASC = await this.ormRepository.find({
            where: {
              type,
            },
            order: {
              price: 'ASC',
            },
          });

          return allCardsByFoodTypeASC;

        default:
          const allCardsByFoodTypeDESC = await this.ormRepository.find({
            where: {
              type,
            },
            order: {
              price: 'DESC',
            },
          });

          return allCardsByFoodTypeDESC;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async listCardsByPrice({
    option,
    minPrice,
    maxPrice,
  }: IFindCardByPriceRangeDTO): Promise<Cards[] | undefined> {
    try {
      switch (option) {
        case 'ASC':
          const allCardsByPriceASC = await this.ormRepository.find({
            where: {
              price: Between(minPrice, maxPrice),
            },
            order: {
              price: 'ASC',
            },
          });

          return allCardsByPriceASC;
          break;

        default:
          const allCardsByPriceDESC = await this.ormRepository.find({
            where: {
              price: Between(minPrice, maxPrice),
            },
            order: {
              price: 'DESC',
            },
          });

          return allCardsByPriceDESC;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async listCardsByTypeAndPrice({
    option,
    type,
    minPrice,
    maxPrice,
  }: IFindCardByTypeAndPriceRangeDTO): Promise<Cards[] | undefined> {
    try {
      switch (option) {
        case 'ASC':
          const allCardsByPriceASC = await this.ormRepository.find({
            where: {
              type,
              price: Between(minPrice, maxPrice),
            },
            order: {
              price: 'ASC',
            },
          });

          return allCardsByPriceASC;

        default:
          const allCardsByPriceDESC = await this.ormRepository.find({
            where: {
              type,
              price: Between(minPrice, maxPrice),
            },
            order: {
              price: 'DESC',
            },
          });

          return allCardsByPriceDESC;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async removeCard(id: string): Promise<void> {
    try {
      const card = await this.ormRepository.findOne(id);

      if (!card) {
        throw new Error('Card not found!');
      }

      await this.ormRepository.remove(card);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async updateCard(card: Cards): Promise<Cards> {
    try {
      const updateCard = await this.ormRepository.save(card);

      return updateCard;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async findCardById(id: string): Promise<Cards | undefined> {
    try {
      const card = await this.ormRepository.findOne(id);

      return card;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CardsRepository;
