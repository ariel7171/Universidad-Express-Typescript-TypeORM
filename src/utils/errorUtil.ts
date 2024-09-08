import { Response } from 'express';

export function manejarErroresDeValidacion(error: Array<any>, res: Response, mensaje: string): void {

    const erroresDeValidacion = error.reduce((acc, { property, constraints }) => {
        acc[property] = constraints[Object.keys(constraints)[0]];
        return acc;
    }, {});

    res.status(400).json({ message: `Error de validación de ${mensaje}`, errors: erroresDeValidacion });

}