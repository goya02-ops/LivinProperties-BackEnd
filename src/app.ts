import 'reflect-metadata'
import express from "express";
import { orm, syncSchema } from './shared/orm.js';
import { RequestContext } from '@mikro-orm/mysql';

import { router as cityRouter } from './city/city.routes.js';
import { router as neighborhoodRouter } from './neighborhood/neighborhood.routes.js';
import { stateRouter } from './state/state.routes.js';
import { priceRouter } from './price/price.routes.js';
import { documentationRouter } from './documentation/documentation.routes.js';
import { userRouter } from './user/user.routes.js';

const app = express();
app.use(express.json());

//luego de los middleware bases
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

//antes de las rutas y de los middleware de negocio

app.use('/cities', cityRouter);
app.use('/neighborhoods', neighborhoodRouter);
app.use('/api/users', userRouter);
app.use('/api/states', stateRouter);
app.use('/api/prices', priceRouter);
app.use('/api/documents', documentationRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not Found" });
  return;
})

await syncSchema(); //never in production

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});