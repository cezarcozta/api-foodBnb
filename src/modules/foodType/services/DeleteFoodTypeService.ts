import { injectable, inject } from 'tsyringe';
import IFoodTypesRepository from '../repositories/IFoodTypeRepository';

@injectable()
class DeleteFoodTypeService {
  constructor(
    @inject('FoodTypesRepository')
    private foodTypesRepository: IFoodTypesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    try {
      await this.foodTypesRepository.removeFoodType(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default DeleteFoodTypeService;
