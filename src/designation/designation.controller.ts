import e, { Request, Response, NextFunction } from 'express';
import { Designation } from './designation.entity.js';
import { orm } from '../shared/orm.js';

function sanitizeDesignationInput(req: Request, res: Response, next: NextFunction) {

  req.body.sanitizeInput = {
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    state: req.body.state,
    //agent: req.body.user,
  };

  Object.keys(req.body.sanitizeDesignationInput).forEach((key) => {
    if (req.body.sanitizeDesignationInput[key] === undefined) {
      delete req.body.sanitizeDesignationInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const em = orm.em;
    const designation = await em.find(Designation, {},{
      populate: ['state', 'agent']
    });
    res.status(200).json({message: "Find all designation", data: designation});
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id)
    const designation = await em.findOneOrFail(Designation, { id }, {
      populate: ['state', 'agent']
    });
    res.status(200).json({message: "Designation found: ", data: designation});
  } catch (error: any) {
    res.status(500).json({ data: error.message })
  }
}


async function add(req: Request, res: Response) {
  try{
    const em = orm.em;
    const designation = em.create(Designation, req.body);
    await em.flush();
    res.status(201).json({ message: "Designation created", data: Designation});
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}


async function update(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const designation = await em.findOneOrFail(Designation, { id });
    em.assign(designation, req.body.sanitizeInput);
    await em.flush();
    res.status(200).json({ message: "Designation updated", data: designation });
  } catch (error:any) {
    res.status(500).json({ data: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const designation = em.getReference(Designation, id);
    await em.removeAndFlush(designation);
    res.status(200).json({ message: "Designation deleted", data: designation });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

export const designationController = {
  findAll,
  findOne,
  add,
  update,
  remove,
  sanitizeDesignationInput
};