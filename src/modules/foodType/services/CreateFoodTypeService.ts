import { injectable, inject } from 'tsyringe';

import IFoodTypesRepository from '@modules/foodType/repositories/IFoodTypeRepository';

import FoodType from '@modules/foodType/infra/typeorm/entities/FoodType';

interface IRequest {
  name: string;
}

@injectable()
class CreateFoodTypeService {
  constructor(
    @inject('FoodTypesRepository')
    private foodTypesRepository: IFoodTypesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<FoodType> {
    try {
      const foodType = await this.foodTypesRepository.createAndSave({
        name,
      });

      return foodType;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CreateFoodTypeService;
