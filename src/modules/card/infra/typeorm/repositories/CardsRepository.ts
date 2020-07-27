/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import { getRepository, Repository, Between } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

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
    image,
    type,
    price,
  }: ICreateCardDTO): Promise<Cards> {
    try {
      const card = this.ormRepository.create({
        name,
        image,
        price,
        type,
      });

      const imageFilePath = path.join(uploadConfig.directory, image);

      await fs.promises.stat(imageFilePath);

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

  public async updateImageCard(
    card: string,
    imageFileName: string,
  ): Promise<void> {
    try {
      const updateImageCard = await this.ormRepository.findOne(card);

      if (!updateImageCard) {
        throw new Error('Card not found!');
      }

      if (updateImageCard.image) {
        // deleter avatar existente
        const cardImageFilePath = path.join(
          uploadConfig.directory,
          updateImageCard.image,
        );

        const cardImageFilExists = await fs.promises.stat(cardImageFilePath);

        if (cardImageFilExists) {
          await fs.promises.unlink(cardImageFilePath);
        }
      }

      updateImageCard.image = imageFileName;

      await this.ormRepository.save(updateImageCard);
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
