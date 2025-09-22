import { VisitController as controller } from "./visit.controller.js";
import { Router } from "express";

export const visitRouter = Router();

visitRouter.get("/", controller.findAll);
visitRouter.get("/:id", controller.findOne);
visitRouter.post("/", controller.sanitizeVisitInput, controller.add);
visitRouter.put("/:id", controller.sanitizeVisitInput, controller.update);
visitRouter.patch("/:id", controller.sanitizeVisitInput, controller.update);
visitRouter.delete("/:id", controller.remove);
