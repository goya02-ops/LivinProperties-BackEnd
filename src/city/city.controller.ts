import { Request, Response, NextFunction } from "express";
import { City } from "./city";
import { orm } from "../shared/orm.js";

// Middleware para sanitizar la entrada.
function sanitizeCityInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizeInput = {
        postalCode: req.body.postalCode,
        name: req.body.name,
    };

    Object.keys(req.body.sanitizeInput).forEach(key => {
        if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
    });

    next();
}

// Obtener todas las ciudades.
async function findAll(req: Request, res: Response) {
    try {
        const em = orm.em;
        const cities = await em.find(City, {});
        res.status(200).json({ message: "Cities retrieved successfully", data: cities });
    } catch (error: any) {
        res.status(500).json({ data: error.message });
    }
}

// Obtener una ciudad por su código postal.
async function findOne(req: Request, res: Response) {
    try {
        const em = orm.em;
        const postalCode = Number.parseInt(req.params.id);
        const city = await em.findOne(City, { postalCode });

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json({ message: "City retrieved successfully", data: city });
    } catch (error: any) {
        res.status(500).json({ data: error.message });
    }
}

// Crear una nueva ciudad.
async function add(req: Request, res: Response) {
    try {
        const em = orm.em;
        const city = em.create(City, req.body.sanitizeInput);
        await em.persistAndFlush(city);
        res.status(201).json({ message: "City created successfully", data: city });
    } catch (error: any) {
        res.status(500).json({ data: error.message });
    }
}

// Actualizar una ciudad.
async function update(req: Request, res: Response) {
    try {
        const em = orm.em;
        const postalCode = Number.parseInt(req.params.id);
        const city = await em.findOneOrFail(City, { postalCode });
        em.assign(city, req.body.sanitizeInput);
        await em.flush();
        res.status(200).json({ message: "City updated successfully", data: city });
    } catch (error: any) {
        if (error.name === 'EntityNotFoundError') {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(500).json({ data: error.message });
    }
}

// Eliminar una ciudad.
async function remove(req: Request, res: Response) {
    try {
        const em = orm.em;
        const postalCode = Number.parseInt(req.params.id);
        const city = await em.findOneOrFail(City, { postalCode });
        await em.removeAndFlush(city);
        res.status(200).json({ message: "City deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ data: error.message });
    }
}

export const CityController = {
    sanitizeCityInput,
    findAll,
    findOne,
    add,
    update,
    remove,
};