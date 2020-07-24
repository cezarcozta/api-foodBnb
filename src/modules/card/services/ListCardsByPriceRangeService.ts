import { injectable, inject } from 'tsyringe';

import ICardsRepository from '../repositories/ICardsRepository';
import Cards from '../infra/typeorm/entities/Cards';
import IFindCardByPriceRangeDTO from '../dtos/IFindCardByPriceRangeDTO';

@injectable()
class ListCardsByPriceRangeService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({
    option,
    minPrice,
    maxPrice,
  }: IFindCardByPriceRangeDTO): Promise<Cards[] | undefined> {
    try {
      const cardsByPrice = await this.cardsRepository.listCardsByPrice({
        option,
        minPrice,
        maxPrice,
      });

      return cardsByPrice;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ListCardsByPriceRangeService;
