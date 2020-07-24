import { injectable, inject } from 'tsyringe';
import ICardsRepository from '../repositories/ICardsRepository';

@injectable()
class DeleteCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    try {
      await this.cardsRepository.removeCard(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default DeleteCardService;
