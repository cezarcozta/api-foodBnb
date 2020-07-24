import { getRepository, Repository } from 'typeorm';

import ICreateFoodTypeDTO from '@modules/foodType/dtos/ICreateFoodTypeDTO';
import IFoodTypesRepository from '@modules/foodType/repositories/IFoodTypeRepository';

import FoodType from '../entities/FoodType';

class FoodTypesRepository implements IFoodTypesRepository {
  private ormRepository: Repository<FoodType>;

  constructor() {
    this.ormRepository = getRepository(FoodType);
  }

  public async createAndSave({ name }: ICreateFoodTypeDTO): Promise<FoodType> {
    try {
      const foodType = this.ormRepository.create({ name });

      await this.ormRepository.save(foodType);

      return foodType;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async listAllFoodTypes(): Promise<FoodType[]> {
    try {
      return await this.ormRepository.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async removeFoodType(id: string): Promise<void> {
    try {
      const card = await this.ormRepository.findOne(id);

      if (!card) {
        throw new Error('FoodType not found!');
      }

      await this.ormRepository.remove(card);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async updateFoodType(foodType: FoodType): Promise<FoodType> {
    try {
      return await this.ormRepository.save(foodType);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async findFoodTypeById(id: string): Promise<FoodType | undefined> {
    try {
      return await this.ormRepository.findOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default FoodTypesRepository;
