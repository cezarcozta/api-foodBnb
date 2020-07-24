import { Request, Response } from 'express';

import CreateFoodTypeService from '@modules/foodType/services/CreateFoodTypeService';
import { container } from 'tsyringe';
import ListAllFoodTypesService from '@modules/foodType/services/ListAllFoodTypesService';
import UpdateFoodTypeService from '@modules/foodType/services/UpdateFoodTypeService';
import DeleteFoodTypeService from '@modules/foodType/services/DeleteFoodTypeService';

export default class FoodTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createFoodType = container.resolve(CreateFoodTypeService);

    try {
      const card = await createFoodType.execute({
        name,
      });

      return response.json(card);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAll = container.resolve(ListAllFoodTypesService);

    try {
      const allFoodTypes = await listAll.execute();

      return response.json(allFoodTypes);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const removeFoodType = container.resolve(DeleteFoodTypeService);

      await removeFoodType.execute(id);

      return response.status(204).json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, type, price, ...rest } = request.body;

      const card = { id, name, type, price };

      const updateFoodType = container.resolve(UpdateFoodTypeService);

      const updatedFoodCard = await updateFoodType.execute({
        id,
        name,
        ...rest,
      });

      return response.json(updatedFoodCard);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
