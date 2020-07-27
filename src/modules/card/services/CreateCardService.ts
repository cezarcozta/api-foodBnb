import { injectable, inject } from 'tsyringe';
import ICardsRepository from '../repositories/ICardsRepository';
import Cards from '../infra/typeorm/entities/Cards';

interface IFoodType {
  name: string;
}
interface IRequest {
  name: string;
  image: string;
  type: IFoodType;
  price: number;
}

@injectable()
class CreateCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({ name, image, type, price }: IRequest): Promise<Cards> {
    try {
      const card = await this.cardsRepository.createAndSave({
        name,
        image,
        type,
        price,
      });

      return card;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CreateCardService;
