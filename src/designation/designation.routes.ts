import { designationController as controller } from "./designation.controller.js";
import { Router } from "express";

export const designationRouter = Router();
designationRouter.get("/", controller.findAll);
designationRouter.get("/:id", controller.findOne);
designationRouter.post("/", controller.sanitizeDesignationInput,controller.add);
designationRouter.put("/:id", controller.sanitizeDesignationInput,controller.update);
designationRouter.patch("/:id", controller.sanitizeDesignationInput, controller.update);
designationRouter.delete("/:id", controller.remove);