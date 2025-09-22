import { Request, Response, NextFunction } from "express";
import { Payment } from "./payment.entity.js";
import { orm } from "../shared/orm.js";

// Middleware para sanitizar la entrada.
function sanitizePaymentInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizeInput = {
        amount: req.body.amount,
        date_since: req.body.date_since,
        id_state: req.body.id_state,
        payment: req.body.payment,
    };

    Object.keys(req.body.sanitizeInput).forEach(key => {
        if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
    });

    next();
}

// Obtener todos los pagos.
async function findAll(req: Request, res: Response) {
    try {
        const em = orm.em;
        const payments = await em.find(Payment, {});
        res.status(200).json({ message: "Payments retrieved successfully", data: payments });
    } catch (error: any) {
        res.status(500).json({ data: error.message });
    }
}

// Obtener un pago por ID
async function findOne(req: Request, res: Response) {
    try {
        const em = orm.em;
        const id = Number(req.params.id);

        const payment = await em.findOne(Payment, {id}, { populate: ['designation'] });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment retrieved successfully", data: payment });
    } catch (error: any) {
        res.status(500).json({ data: error.message });
    }
}

// Crear un nuevo pago
async function add(req: Request, res: Response) {
    const em = orm.em;
    try {
    // Crear el pago usando BaseEntity
    const payment = em.create(Payment, req.body.sanitizeInput);

    await em.persistAndFlush(payment);

    res.status(201).json({ message: "Payment created successfully", data: payment });
    } catch (error: any) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal server error", data: error.message });
    }
}



// Actualizar un pago
async function update(req: Request, res: Response) {
    try {
        const em = orm.em.fork();
        const id = Number(req.params.id);

        const payment = await em.findOneOrFail(Payment, { id });

        if (!payment){
            return res.status(404).json({ message: "Payment not found" });
        }
        //Actualizo los campos que vienen en el body
        if (req.body.amount !== undefined) {
            payment.amount = req.body.amount;
        }

        if (req.body.date_since !== undefined) {
            payment.date_since = new Date(req.body.date_since);
        }

        /*
        if (req.body.id_state !== undefined) {
            payment.id_state = "a qué lo agrego???"
        */

        await em.persistAndFlush(payment);
        res.status(200).json({ message: "Payment updated successfully", data: payment });
    } catch (error: any) {
        if (error.name === 'EntityNotFoundError') {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(500).json({ data: error.message });
    }
}

// Eliminar un pago
async function remove(req: Request, res: Response) {
    try {
        const em = orm.em.fork();
        const id = Number(req.params.id);

        const payment = await em.findOne(Payment, {id});

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

    await em.removeAndFlush(payment);

    res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error: any) {
    res.status(500).json({ data: error.message });
    }
}


export const PaymentController = {
    sanitizePaymentInput,
    findAll,
    findOne,
    add,
    update,
    remove,
};
