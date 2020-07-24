import { injectable, inject } from 'tsyringe';

import IFoodTypesRepository from '@modules/foodType/repositories/IFoodTypeRepository';

import FoodType from '@modules/foodType/infra/typeorm/entities/FoodType';

@injectable()
class ListAllFoodTypes {
  constructor(
    @inject('FoodTypesRepository')
    private foodTypesRepository: IFoodTypesRepository,
  ) {}

  public async execute(): Promise<FoodType[]> {
    try {
      const allFoodTypes = await this.foodTypesRepository.listAllFoodTypes();

      return allFoodTypes;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ListAllFoodTypes;
