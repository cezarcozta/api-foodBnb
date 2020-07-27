import { injectable, inject } from 'tsyringe';
import ICardsRepository from '../repositories/ICardsRepository';

interface IRequest {
  card_id: string;
  imageFileName: string;
}

@injectable()
class UpdateCardImageService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({ card_id, imageFileName }: IRequest): Promise<void> {
    try {
      const updateImageCard = await this.cardsRepository.findCardById(card_id);

      if (!updateImageCard) {
        throw new Error('ERROR');
      }

      const updatedImageCard = await this.cardsRepository.updateImageCard(
        card_id,
        imageFileName,
      );

      return updatedImageCard;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UpdateCardImageService;
