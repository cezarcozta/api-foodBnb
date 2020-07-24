import FoodType from '@modules/foodType/infra/typeorm/entities/FoodType';
import IFoodTypeDTO from '../dtos/ICreateFoodTypeDTO';

export default interface IFoodTypeRepository {
  createAndSave(data: IFoodTypeDTO): Promise<FoodType>;

  listAllFoodTypes(): Promise<FoodType[]>;

  removeFoodType(id: string): Promise<void>;

  updateFoodType(FoodType: FoodType): Promise<FoodType>;

  findFoodTypeById(id: string): Promise<FoodType | undefined>;
}
