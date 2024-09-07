import { DeleteResult, Repository, UpdateResult } from "typeorm";
import AppdataSource from "../database/database";
import { Profesor } from "../models/profesorModel";
import { Request, Response } from "express";

const profesorRepository: Repository<Profesor> = AppdataSource.getRepository(Profesor);

export const obtenerProfesores = async (req: Request, res: Response): Promise<void> => {
  try {
    const profesor: Profesor[] = await profesorRepository.find();

    if (profesor.length === 0) {
      res.status(404).json({ message: "No hay Profesores" });
      return;
    }

    res.status(200).json(profesor);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener a los Profesors", error: error.message });
  }
}

export const obtenerProfesorPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const profesor: Profesor | null = await profesorRepository.findOneBy({ id: Number(id) });

    if (!profesor) {
      res.status(404).json({ message: "Profesor no encontrado" });
      return;
    }

    res.status(200).json(profesor);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener el profesor", error: error.message });
  }
}

export const guardarProfesor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dni, nombre, apellido, email } = req.body as Profesor;

    const instanciaProfesor: Profesor = profesorRepository.create({ dni, nombre, apellido, email });

    const profesor: Profesor = await profesorRepository.save(instanciaProfesor);

    res.status(201).json(profesor);
  } catch (error: any) {
    res.status(500).json({ message: "Error al crear el profesor", error: error.message });
  }
}

export const actualizarProfesor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { dni, nombre, apellido, email, profesion, telefono } = req.body as Profesor;

    const profesor: Profesor | null = await profesorRepository.findOneBy({ id: Number(id) });
    if (!profesor) {
      res.status(404).json({ message: "Profesor no encontrado" });
      return;
    }

    const result: UpdateResult = await profesorRepository.update({ id: Number(id) }, { dni, nombre, apellido, email, profesion, telefono });
    if (result.affected === 0) {
      res.status(404).json({ message: "Profesor no encontrado" });
      return;
    }

    res.status(200).json({ message: "Profesor Actualizado" });
  } catch (error: any) {
    res.status(500).json({ message: "Error al actualizar el Profesor", error: error.message });
  }
}

export const eliminarProfesor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const profesor: Profesor | null = await profesorRepository.findOneBy({ id: Number(id) });
    if (!profesor) {
      res.status(404).json({ message: 'Profesor no encontrado' });
      return;
    }

    const result: DeleteResult = await profesorRepository.delete({ id: Number(id) });
    if (result.affected === 0) {
      res.status(404).json({ message: 'Profesor no encontrado' });
      return;
    }

    res.status(200).json({ message: 'Profesor eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar profesor', error: error.message });
  }
}
