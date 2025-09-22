import { Request, Response, NextFunction } from "express";
import { User } from "./user.entity.js";
import { orm } from "../shared/orm.js";

function sanitizeUserInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizeInput = {
    docNumber: req.body.docNumber,
    typeDoc: req.body.typeDoc,
    name: req.body.name,
    email: req.body.email,
    surname: req.body.surname,
    type: req.body.type,
    cuil: req.body.cuil,
    agentNumber: req.body.agentNumber,
  };
  Object.keys(req.body.sanitizeInput).forEach((key) => {
    if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const em = orm.em
    const users = await em.find(User, {});
    res.status(200).json({message: "Find all users classes", data: users});
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em
    const id = Number.parseInt(req.params.id)
    const user = await em.findOneOrFail(User,{ id });
    res.status(200).json({message: "User found: ", data: user})
  } catch (error: any) {
    res.status(500).json({ data: error.message })
  }
}

async function add(req: Request, res: Response) {
  try{
    const em = orm.em
    const user = em.create(User, req.body);
    await em.flush();
    res.status(201).json({ message: "User class created", data: user });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const em = orm.em
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(User, { id });
    em.assign(user, req.body.sanitizeInput);
    await em.flush();
    res.status(200).json({ message: "User class updated", data: user });
  } catch (error:any) {
    res.status(500).json({ data: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = orm.em
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(User, { id });
    await em.removeAndFlush(user);
    res.status(200).json({ message: "User class deleted", data: user });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

export const UserController = {
  sanitizeUserInput,
  findAll,
  findOne,
  add,
  update,
  remove
};