import { Router } from 'express';

import FoodTypesController from '../controllers/FoodTypesController';

const foodTypesRouter = Router();
const foodTypesController = new FoodTypesController();

foodTypesRouter.post('/', foodTypesController.create);
foodTypesRouter.get('/', foodTypesController.index);
foodTypesRouter.put('/:id', foodTypesController.update);
foodTypesRouter.delete('/:id', foodTypesController.remove);

export default foodTypesRouter;
