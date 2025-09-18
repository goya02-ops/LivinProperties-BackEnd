import { Request, Response, NextFunction } from "express";
import { Visit } from  "../visit/visit.entity.js";
import { orm } from "../shared/orm.js";

function sanitizeVisitInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizeInput = {
    date: req.body.date,
    hour: req.body.hour,
    state: req.body.state,
  };
  Object.keys(req.body.sanitizeInput).forEach((key) => {
    if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const em = orm.em;
    const visits = await em.find(Visit, {});
    res.status(200).json({ message: "Find all visits", data: visits });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const visit = await em.findOneOrFail(Visit, { id });
    res.status(200).json({ message: "Visit found", data: visit });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const em = orm.em;
    const visit = em.create(Visit, req.body);
    await em.flush();
    res.status(201).json({ message: "Visit created", data: visit });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const visit = await em.findOneOrFail(Visit, { id });
    em.assign(visit, req.body.sanitizeInput);
    await em.flush();
    res.status(200).json({ message: "Visit updated", data: visit });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const visit = await em.findOneOrFail(Visit, { id });
    await em.removeAndFlush(visit);
    res.status(200).json({ message: "Visit deleted", data: visit });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

export const VisitController = {
  sanitizeVisitInput,
  findAll,
  findOne,
  add,
  update,
  remove
};
