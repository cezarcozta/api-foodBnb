import { container } from 'tsyringe';

import ICardsRepository from '@modules/card/repositories/ICardsRepository';
import CardsRepository from '@modules/card/infra/typeorm/repositories/CardsRepository';

import IFoodTypesRepository from '@modules/foodType/repositories/IFoodTypeRepository';
import FoodTypesRepository from '@modules/foodType/infra/typeorm/repositories/FoodTypesRepository';

container.registerSingleton<ICardsRepository>(
  'CardsRepository',
  CardsRepository,
);

container.registerSingleton<IFoodTypesRepository>(
  'FoodTypesRepository',
  FoodTypesRepository,
);
