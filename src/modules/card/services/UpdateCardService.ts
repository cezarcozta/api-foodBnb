import { injectable, inject } from 'tsyringe';
import ICardsRepository from '../repositories/ICardsRepository';
import Cards from '../infra/typeorm/entities/Cards';

@injectable()
class UpdateCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({ id, name, type, price }: Cards): Promise<Cards> {
    try {
      const updateCard = await this.cardsRepository.findCardById(id);

      if (!updateCard) {
        throw new Error('Card not found!');
      }

      updateCard.name = name;
      updateCard.type = type;
      updateCard.price = price;

      const updatedCard = await this.cardsRepository.updateCard(updateCard);

      return updatedCard;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UpdateCardService;
