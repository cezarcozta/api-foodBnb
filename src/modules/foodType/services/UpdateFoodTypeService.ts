import { injectable, inject } from 'tsyringe';
import IFoodTypesRepository from '../repositories/IFoodTypeRepository';
import FoodTypes from '../infra/typeorm/entities/FoodType';

@injectable()
class UpdateCardService {
  constructor(
    @inject('FoodTypesRepository')
    private foodTypesRepository: IFoodTypesRepository,
  ) {}

  public async execute({ id, name }: FoodTypes): Promise<FoodTypes> {
    try {
      const updateFoodType = await this.foodTypesRepository.findFoodTypeById(
        id,
      );

      if (!updateFoodType) {
        throw new Error('Card not found!');
      }

      updateFoodType.name = name;

      const updatedFoodType = await this.foodTypesRepository.updateFoodType(
        updateFoodType,
      );

      return updatedFoodType;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UpdateCardService;
