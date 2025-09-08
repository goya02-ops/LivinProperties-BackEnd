import { Request, Response, NextFunction } from "express"
import { State } from "./state.entity.js"
import { orm } from "../shared/orm.js"

function sanitizeStateInput(req: Request, res: Response, next: NextFunction) {

  req.body.sanitizeInput = {
    description: req.body.description,
    denomination: req.body.denomination,
    status: req.body.status,
    address: req.body.address,
    aptNumber: req.body.aptNumber,
  };

  Object.keys(req.body.sanitizeInput).forEach(key => {
    if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const em = orm.em;
    const states = await em.find(State, {});
    res.status(200).json({message: "States retrieved successfully", data: states});
  } catch (error: any) {
    res.status(500).json({data: error.message});
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const state = await em.findOne(State, { id });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({ message: "State retrieved successfully", data: state });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const em = orm.em;
    const state = em.create(State, req.body.sanitizeInput);
    await em.persistAndFlush(state);
    res.status(201).json({ message: "State created successfully", data: state });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function update(req: Request, res: Response) {
  try{
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const state = await em.findOneOrFail(State, { id });
    em.assign(state, req.body.sanitizeInput);
    await em.flush();
    res.status(200).json({ message: "State updated successfully", data: state });
  } catch (error: any) {
    if (error.name === 'EntityNotFoundError') {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(500).json({ data: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const state = await em.findOneOrFail(State, { id });
    await em.removeAndFlush(state);
    res.status(200).json({ message: "State deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

export const StateController = {
  sanitizeStateInput,
  findAll,
  findOne,
  add,
  update,
  remove
};