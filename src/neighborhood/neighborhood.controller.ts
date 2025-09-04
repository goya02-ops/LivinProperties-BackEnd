// src/neighborhood/neighborhood.controller.ts
import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/orm.js';
import { Neighborhood } from './neighborhood.entity.js';
import { City } from '../city/city.entity.js';

const em = orm.em;

// READ: Obtener un barrio por su clave primaria compuesta
async function findOne(req: Request, res: Response, next: NextFunction) {
    try {
        // Convertir el string a number
        const cityId = Number(req.params.postalCode);

        // Buscar la instancia de la ciudad usando su clave primaria
        const city = await em.findOne(City, { postalCode: cityId });

        if (!city) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        
        // Buscar el barrio usando la instancia de la ciudad
        const neighborhood = await em.findOne(Neighborhood, {
            name: req.params.name,
            city: city
        }, {
            populate: ['city']
        });

        if (neighborhood) {
            res.status(200).json(neighborhood);
        } else {
            res.status(404).json({ message: 'Barrio no encontrado' });
        }
    } catch (error) {
        next(error);
    }
}

// CREATE: Agregar un nuevo barrio
// src/neighborhood/neighborhood.controller.ts
// ... (resto del código y imports) ...

// CREATE: Agregar un nuevo barrio
async function add(req: Request, res: Response, next: NextFunction) {
    try {
        const cityPostalCode = Number(req.body.postalCode);

        // Validar si el código postal es un número válido
        if (isNaN(cityPostalCode)) {
            return res.status(400).json({ message: 'El código postal no es un número válido.' });
        }
        
        const city = await em.findOne(City, { postalCode: cityPostalCode });
        
        if (!city) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }

        const newNeighborhood = em.create(Neighborhood, {
            name: req.body.name,
            city: city
        });

        await em.flush();

        res.status(201).json(newNeighborhood);
    } catch (error) {
        next(error);
    }
}

// UPDATE: Actualizar un barrio existente
async function update(req: Request, res: Response, next: NextFunction) {
    try {
        // Convertir el string a number
        const cityId = Number(req.params.postalCode);

        const neighborhoodToUpdate = await em.findOne(Neighborhood, {
            name: req.params.name,
            city: { postalCode: cityId }
        });

        if (!neighborhoodToUpdate) {
            return res.status(404).json({ message: 'Barrio no encontrado' });
        }
        
        neighborhoodToUpdate.name = req.body.name;
        await em.flush();

        res.status(200).json(neighborhoodToUpdate);
    } catch (error) {
        next(error);
    }
}

// DELETE: Eliminar un barrio por su clave compuesta
async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        // Convertir el string a number
        const cityId = Number(req.params.postalCode);
        
        const neighborhood = await em.findOne(Neighborhood, {
            name: req.params.name,
            city: { postalCode: cityId }
        });

        if (!neighborhood) {
            return res.status(404).json({ message: 'Barrio no encontrado' });
        }

        await em.removeAndFlush(neighborhood);

        res.status(200).json({ message: 'Barrio eliminado correctamente' });
    } catch (error) {
        next(error);
    }
}

export const NeighborhoodController = {
    findOne,
    add,
    update,
    remove
}