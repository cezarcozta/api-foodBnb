import { Router } from 'express';

import cardsRouter from '@modules/card/infra/http/routes/card.routes';
import foodTypesRouter from '@modules/foodType/infra/http/routes/foodType.routes';

const routes = Router();

routes.use('/cards', cardsRouter);
routes.use('/foods', foodTypesRouter);

export default routes;
