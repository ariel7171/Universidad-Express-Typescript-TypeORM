import { DeleteResult, Repository, UpdateResult } from "typeorm";
import AppdataSource from "../database/database";
import { Estudiante } from "../models/estudianteModel";
import { Request, Response } from "express";
import { manejarErroresDeValidacion } from "../utils/errorUtil";
import { validateOrReject } from "class-validator";

const estudianteRepository: Repository<Estudiante> = AppdataSource.getRepository(Estudiante);

export const obtenerEstudiantes = async (req: Request, res: Response): Promise<void> => {
  try {
    const estudiantes: Estudiante[] = await estudianteRepository.find();

    if (estudiantes.length === 0) {
      res.status(404).json({ message: "No hay estudiantes" });
      return;
    }

    res.status(200).json(estudiantes);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener a los estudiantes", error: error.message });
  }
}

export const obtenerEstudiantePorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const estudiante: Estudiante | null = await estudianteRepository.findOneBy({ id: Number(id) });

    if (!estudiante) {
      res.status(404).json({ message: "Estudiante no encontrado" });
      return;
    }

    res.status(200).json(estudiante);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener el estudiante", error: error.message });
  }
}

export const guardarEstudiante = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dni, nombre, apellido, email } = req.body;

    const estudianteBody = estudianteRepository.create({ dni, nombre, apellido, email });

    try {
      await validateOrReject(estudianteBody);
    } catch (validationErrors: any) {
      manejarErroresDeValidacion(validationErrors, res, "estudiante");
      return;
    }

    const estudiante: Estudiante = await estudianteRepository.save(estudianteBody);

    res.status(201).json(estudiante);
  } catch (error: any) {

    res.status(500).json({ message: "Error al crear el estudiante", error: error.message });
  }
}

export const actualizarEstudiante = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { dni, nombre, apellido, email } = req.body;

    const estudianteBody = estudianteRepository.create({ dni, nombre, apellido, email });

    try {
      await validateOrReject(estudianteBody);
    } catch (validationErrors: any) {
      manejarErroresDeValidacion(validationErrors, res, "estudiante");
      return;
    }

    const estudiante: Estudiante | null = await estudianteRepository.findOneBy({ id: Number(id) });
    if (!estudiante) {
      res.status(404).json({ message: "Estudiante no encontrado" });
      return;
    }

    const result: UpdateResult = await estudianteRepository.update({ id: Number(id) }, estudianteBody);
    if (result.affected === 0) {
      res.status(404).json({ message: "No se pudo actualizar el estudiante" });
      return;
    }

    res.status(200).json({ message: "Estudiante Actualizado" });
  } catch (error: any) {

    res.status(500).json({ message: "Error al actualizar el estudiante", error: error.message });
  }
}

export const eliminarEstudiante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const estudiante: Estudiante | null = await estudianteRepository.findOneBy({ id: Number(id) });
    if (!estudiante) {
      res.status(404).json({ message: 'Estudiante no encontrado' });
      return;
    }

    const result: DeleteResult = await estudianteRepository.delete({ id: Number(id) });
    if (result.affected === 0) {
      res.status(404).json({ message: 'No se pudo eliminar el estudiante' });
      return;
    }

    res.status(200).json({ message: 'Estudiante eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar estudiante', error: error.message });
  }
}
