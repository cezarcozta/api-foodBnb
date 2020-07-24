import { injectable, inject } from 'tsyringe';

import ICardsRepository from '../repositories/ICardsRepository';
import Cards from '../infra/typeorm/entities/Cards';
import IFindCardByTypeAndPriceRangeDTO from '../dtos/IFindCardByTypeAndPriceRangeDTO';

@injectable()
class ListCardsByTypeAndPriceRangeService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({
    option,
    type,
    minPrice,
    maxPrice,
  }: IFindCardByTypeAndPriceRangeDTO): Promise<Cards[] | undefined> {
    try {
      const cardsByPrice = await this.cardsRepository.listCardsByTypeAndPrice({
        option,
        type,
        minPrice,
        maxPrice,
      });

      return cardsByPrice;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ListCardsByTypeAndPriceRangeService;
