import { Request, Response, NextFunction } from "express";
import { Neighborhood } from "./neighborhood.entity.js";
import { City } from "../city/city.entity.js";
import { orm } from "../shared/orm.js";

// Middleware para sanitizar la entrada.
function sanitizeNeighborhoodInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizeInput = {
        name: req.body.name,
        city: req.body.city, // acá esperamos que venga el postalCode de la ciudad
    };

    Object.keys(req.body.sanitizeInput).forEach(key => {
        if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
    });

    next();
}

// Obtener todos los barrios.
async function findAll(req: Request, res: Response) {
    try {
        const em = orm.em;
        const neighborhoods = await em.find(Neighborhood, {}, { populate: ["city"] });
        res.status(200).json({ message: "Neighborhoods retrieved successfully", data: neighborhoods });
    } catch (error: any) {
        res.status(500).json({ data: error.message });
    }
}

// Obtener un barrio por su nombre y código postal de la ciudad.
async function findOne(req: Request, res: Response) {
    try {
        const em = orm.em;
        const { name, postalCode } = req.params;

        const neighborhood = await em.findOne(Neighborhood, {
            name,
            city: {postalCode: Number(postalCode)}
        }, { populate: ["city"] });

        if (!neighborhood) {
            return res.status(404).json({ message: "Neighborhood not found" });
        }
        res.status(200).json({ message: "Neighborhood retrieved successfully", data: neighborhood });
    } catch (error: any) {
        res.status(500).json({ data: error.message });
    }
}

// Crear un nuevo barrio.
async function add(req: Request, res: Response) {
    const em = orm.em;
    try {
    // Crear el barrio usando BaseEntity
    const neighborhood = em.create(Neighborhood, 
      req.body.sanitizeInput
    );

    await em.persistAndFlush(neighborhood);

    res.status(201).json({ message: "Neighborhood created successfully", data: neighborhood });
  } catch (error: any) {
    console.error("Error creating neighborhood:", error);
    res.status(500).json({ message: "Internal server error", data: error.message });
  }
}



// Actualizar un barrio.
async function update(req: Request, res: Response) {
    try {
        const em = orm.em.fork();
        const { name, postalCode } = req.params;

        const neighborhood = await em.findOneOrFail(Neighborhood, {
            name,
            city: {postalCode: Number(postalCode)}
        }, { populate: ["city"] });

        // Si se quiere actualizar el nombre o cambiar la ciudad, se reasigna
        if (req.body.sanitizeInput.name) neighborhood.name = req.body.sanitizeInput.name;
        if (req.body.sanitizeInput.city) {
            const city = await em.findOneOrFail(City, { postalCode: req.body.sanitizeInput.city });
            neighborhood.city = city;
        }

        await em.flush();
        res.status(200).json({ message: "Neighborhood updated successfully", data: neighborhood });
    } catch (error: any) {
        if (error.name === 'EntityNotFoundError') {
            return res.status(404).json({ message: "Neighborhood not found" });
        }
        res.status(500).json({ data: error.message });
    }
}

// Eliminar un barrio.
async function remove(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const { name, postalCode } = req.params;

    const neighborhood = await em.findOne(Neighborhood, {
      name,
      city: { postalCode: Number(postalCode) },
    }, { populate: ["city"] });

    if (!neighborhood) {
      return res.status(404).json({ message: "Neighborhood not found" });
    }

    await em.removeAndFlush(neighborhood);

    res.status(200).json({ message: "Neighborhood deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ data: error.message });
  }
}


export const NeighborhoodController = {
    sanitizeNeighborhoodInput,
    findAll,
    findOne,
    add,
    update,
    remove,
};
