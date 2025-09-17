import { UserController as controller } from "./user.controller.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", controller.findAll);
userRouter.get("/:id", controller.findOne);
userRouter.post("/", controller.sanitizeUserInput,controller.add);
userRouter.put("/:id", controller.sanitizeUserInput,controller.update);
userRouter.patch("/:id", controller.sanitizeUserInput, controller.update);
userRouter.delete("/:id", controller.remove);