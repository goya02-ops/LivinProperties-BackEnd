import { Router } from "express";
import { CityController as controller } from "./city.controller.js";

export const router = Router();

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/", controller.sanitizeCityInput, controller.add);
router.put("/:id", controller.sanitizeCityInput, controller.update);
router.delete("/:id", controller.remove);