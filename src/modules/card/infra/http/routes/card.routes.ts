import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CardsController from '../controllers/CardsController';

const cardsRouter = Router();

const cardsController = new CardsController();

const upload = multer(uploadConfig);

cardsRouter.post('/', upload.single('image'), cardsController.create);
cardsRouter.get('/', cardsController.index);
cardsRouter.put('/:id', cardsController.update);
cardsRouter.patch('/image', upload.single('image'), cardsController.upload);
cardsRouter.delete('/:id', cardsController.remove);

export default cardsRouter;
