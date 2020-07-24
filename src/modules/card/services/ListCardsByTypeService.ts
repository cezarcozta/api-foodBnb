import { injectable, inject } from 'tsyringe';
import ICardsRepository from '../repositories/ICardsRepository';
import Cards from '../infra/typeorm/entities/Cards';
import IFindCardByFoodType from '../dtos/IFindCardByFoodTypeDTO';

@injectable()
class ListCardsService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({
    option,
    type,
  }: IFindCardByFoodType): Promise<Cards[] | undefined> {
    try {
      const cardsByType = await this.cardsRepository.listCardsByFoodType({
        option,
        type,
      });

      return cardsByType;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ListCardsService;
