import { Router } from 'express';

import CardsController from '../controllers/CardsController';

const cardsRouter = Router();
const cardsController = new CardsController();

cardsRouter.post('/', cardsController.create);
cardsRouter.get('/', cardsController.index);
cardsRouter.put('/:id', cardsController.update);
cardsRouter.delete('/:id', cardsController.remove);

export default cardsRouter;
