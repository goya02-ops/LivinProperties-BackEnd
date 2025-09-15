import { Request, Response, NextFunction } from "express"
import { Documentation } from "./documentation.entity.js"
import { orm } from "../shared/orm.js"

function sanitizeDocumentationInput(req: Request, res: Response, next: NextFunction) {

  req.body.sanitizeInput = {
    denomination: req.body.denomination,
    state: req.body.state,
    format: req.body.format,
    file: req.body.file ? Buffer.from(req.body.file, 'base64') : undefined
  };

  Object.keys(req.body.sanitizeInput).forEach(key => {
    if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const em = orm.em;
    const documents = await em.find(Documentation, { }, { populate: ['state'] });
    res.status(200).json({message: "Documents retrieved successfully", data: documents});
  } catch (error: any) {
    res.status(500).json({data: error.message});
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const documentation = await em.findOne(Documentation, { id }, { populate: ['state'] });
    if (!documentation) {
      return res.status(404).json({ message: "Documentation not found" });
    }
    res.status(200).json({ message: "Documentation retrieved successfully", data: documentation });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const em = orm.em;
    const documentation = em.create(Documentation, req.body.sanitizeInput);
    await em.persistAndFlush(documentation);
    res.status(201).json({ message: "Documentation created successfully", data: documentation });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

async function update(req: Request, res: Response) {
  try{
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const documentation = await em.findOneOrFail(Documentation, { id });
    em.assign(documentation, req.body.sanitizeInput);
    await em.flush();
    res.status(200).json({ message: "Documentation updated successfully", data: documentation });
  } catch (error: any) {
    if (error.name === 'EntityNotFoundError') {
      return res.status(404).json({ message: "Documentation not found" });
    }
    res.status(500).json({ data: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = orm.em;
    const id = Number.parseInt(req.params.id);
    const documentation = em.getReference(Documentation, id);
    await em.removeAndFlush(documentation);
    res.status(200).json({ message: "Documentation deleted", data: documentation });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}

export const DocumentationController = {
  sanitizeDocumentationInput,
  findAll,
  findOne,
  add,
  update,
  remove
};