import { Router } from "express";
import { CityController } from "./city.controller.js";

export const router = Router();

router.get("/", CityController.findAll);
router.get("/:id", CityController.findOne);
router.post("/", CityController.sanitizeCityInput, CityController.add);
router.put("/:id", CityController.sanitizeCityInput, CityController.update);
router.delete("/:id", CityController.remove);