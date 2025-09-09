import { Request, Response, NextFunction } from "express"
import { Price } from "./price.entity.js"
import { orm } from "../shared/orm.js"

function sanitizePriceInput(req: Request, res: Response, next: NextFunction) {

  req.body.sanitizeInput = {
    fromDate: req.body.fromDate,
    value: req.body.value,
    state: req.body.state,
  };

  Object.keys(req.body.sanitizeInput).forEach(key => {
    if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const em = orm.em;
    const prices = await em.find(Price, { }, { populate: ['state'] });
    res.status(200).json({message: "Prices retrieved successfully", data: prices});
  } catch (error: any) {
    res.status(500).json({data: error.message});
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const price = await em.findOne(Price, { id }, { populate: ['state'] });
    if (!price) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({ message: "Price retrieved successfully", data: price });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const em = orm.em;
    const price = em.create(Price, req.body.sanitizeInput);
    await em.persistAndFlush(price);
    res.status(201).json({ message: "Price created successfully", data: price });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function update(req: Request, res: Response) {
  try{
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const price = await em.findOneOrFail(Price, { id });
    em.assign(price, req.body.sanitizeInput);
    await em.flush();
    res.status(200).json({ message: "Pridce updated successfully", data: price });
  } catch (error: any) {
    if (error.name === 'EntityNotFoundError') {
      return res.status(404).json({ message: "Price not found" });
    }
    res.status(500).json({ data: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const price = em.getReference(Price, id);
    await em.removeAndFlush(price);
    res.status(200).json({ message: "Price deleted", data: price });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

export const PriceController = {
  sanitizePriceInput,
  findAll,
  findOne,
  add,
  update,
  remove
};