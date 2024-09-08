import { DeleteResult, Repository, UpdateResult } from "typeorm";
import AppdataSource from "../database/database";
import { Curso } from "../models/cursoModel";
import { Request, Response } from "express";
import { Profesor } from "../models/profesorModel";
import { manejarErroresDeValidacion } from "../utils/errorUtil";
import { validate, validateOrReject } from "class-validator";

const cursoRepository: Repository<Curso> = AppdataSource.getRepository(Curso);

const profesorRepository: Repository<Profesor> = AppdataSource.getRepository(Profesor);

export const obtenerCursos = async (req: Request, res: Response): Promise<void> => {
  try {

    const cursos: Curso[] = await cursoRepository.find();

    if (cursos.length === 0) {
      res.status(404).json({ message: 'No hay cursos' });
      return;
    }

    res.status(200).json(cursos);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener los cursos", error: error.message });
  }
}

export const obtenerCursoPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const curso: Curso | null = await cursoRepository.findOneBy({ id: Number(id) });

    if (!curso) {
      res.status(404).json({ message: 'Curso no encontrado' });
      return;
    }

    res.status(200).json(curso);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener el curso", error: error.message });
  }
}

export const guardarCurso = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, descripcion, profesor_id } = req.body;

    const cursoBody = cursoRepository.create({ nombre, descripcion, profesor_id });

    try {
      await validateOrReject(cursoBody);
    } catch (validationErrors: any) {
      manejarErroresDeValidacion(validationErrors, res, 'curso');
      return;
    }

    const profesor: Profesor | null = await profesorRepository.findOneBy({ id: cursoBody.profesor_id });

    if (!profesor) {
      res.status(404).json({ message: 'Profesor no encontrado' });
      return;
    }

    const curso: Curso = await cursoRepository.save(cursoBody);

    res.status(201).json(curso);
  } catch (error: any) {

    res.status(500).json({ message: "Error al crear el curso", error: error.message });
  }
}

export const actualizarCurso = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id } = req.params;
    const { nombre, descripcion, profesor_id } = req.body;

    const cursoBody = cursoRepository.create({ nombre, descripcion, profesor_id });

    try {
      await validateOrReject(cursoBody);
    } catch (validationErrors: any) {
      manejarErroresDeValidacion(validationErrors, res, 'curso');
      return;
    }

    const curso: Curso | null = await cursoRepository.findOneBy({ id: Number(id) });
    if (!curso) {
      res.status(404).json({ message: 'Curso no encontrado' });
      return;
    }

    const profesor: Profesor | null = await profesorRepository.findOneBy({ id: cursoBody.profesor_id });
    if (!profesor) {
      res.status(404).json({ message: 'Profesor no encontrado' });
      return;
    }

    const result: UpdateResult = await cursoRepository.update({ id: Number(id) }, cursoBody);
    
    if (result.affected === 0) {
      res.status(404).json({ message: "No se pudo actualizar el curso" });
      return;
    }

    res.status(200).json({ message: "Curso Actualizado" });
  } catch (error: any) {

    res.status(500).json({ message: "Error al actualizar el curso", error: error.message });
  }
}

export const eliminarCurso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const curso: Curso | null = await cursoRepository.findOneBy({ id: Number(id) });
    if (!curso) {
      res.status(404).json({ message: 'Curso no encontrado' });
      return;
    }

    const result: DeleteResult = await cursoRepository.delete({ id: Number(id) });
    if (result.affected === 0) {
      res.status(404).json({ message: 'No se pudo eliminar el curso' });
      return;
    }

    res.status(200).json({ message: 'Curso eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar curso', error: error.message });
  }
}
