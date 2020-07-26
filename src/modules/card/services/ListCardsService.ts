import { injectable, inject } from 'tsyringe';
import ICardsRepository from '../repositories/ICardsRepository';
import Cards from '../infra/typeorm/entities/Cards';

@injectable()
class ListCardsService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute(): Promise<Cards[]> {
    try {
      const cards = await this.cardsRepository.listAllCards();
      return cards;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ListCardsService;
