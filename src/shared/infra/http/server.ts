import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';

import routes from './routes';

import '../typeorm';
import '../../container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Backend started on port 3333');
});
