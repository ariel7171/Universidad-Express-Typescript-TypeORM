import { DeleteResult, QueryRunner, Repository, UpdateResult } from "typeorm";
import AppdataSource from "../database/database";
import { Inscripcion } from "../models/inscripcionModel";
import { Request, Response } from "express";
import { Curso } from "../models/cursoModel";
import { Estudiante } from "../models/estudianteModel";
import { manejarErroresDeValidacion } from "../utils/errorUtil";
import { validate, validateOrReject } from "class-validator";

const inscripcionRepository: Repository<Inscripcion> = AppdataSource.getRepository(Inscripcion);

const cursoRepository: Repository<Curso> = AppdataSource.getRepository(Curso);

const estudianteRepository: Repository<Estudiante> = AppdataSource.getRepository(Estudiante);

export const obtenerInscripciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const inscripciones: Inscripcion[] = await inscripcionRepository.find();

    if (inscripciones.length === 0) {
      res.status(404).json({ message: "No hay inscripciones" });
      return;
    }

    res.status(200).json(inscripciones);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener a los inscripcions", error: error.message });
  }
}

export const obtenerInscripcionesPorCurso = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inscripcion: Inscripcion | null = await inscripcionRepository.findOneBy({ curso_id: Number(id) });

    if (!inscripcion) {
      res.status(404).json({ message: "Inscripcion no encontrada" });
      return;
    }

    res.status(200).json(inscripcion);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener el inscripcion", error: error.message });
  }
}

export const obtenerInscripcionesPorEstudiante = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inscripcion: Inscripcion | null = await inscripcionRepository.findOneBy({ estudiante_id: Number(id) });

    if (!inscripcion) {
      res.status(404).json({ message: "Inscripcion no encontrada" });
      return;
    }

    res.status(200).json(inscripcion);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener el inscripcion", error: error.message });
  }
}

export const guardarInscripcion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { curso_id, estudiante_id, nota } = req.body;

    const inscripcionBody = inscripcionRepository.create({ curso_id, estudiante_id, nota });

    try {
      await validateOrReject(inscripcionBody);
    } catch (validationErrors: any) {
      manejarErroresDeValidacion(validationErrors, res, 'inscripcion');
      return;
    }

    const curso: Curso | null = await cursoRepository.findOneBy({ id: inscripcionBody.curso_id });
    if (!curso) {
      res.status(404).json({ message: 'Curso no encontrado' });
      return;
    }

    const estudiante: Estudiante | null = await estudianteRepository.findOneBy({ id: inscripcionBody.estudiante_id });
    if (!estudiante) {
      res.status(404).json({ message: 'Estudiante no encontrado' });
      return;
    }

    const inscripcion: Inscripcion = await inscripcionRepository.save(inscripcionBody);

    res.status(201).json({ inscripcion });
  } catch (error: any) {

    res.status(500).json({ message: "Error al crear la inscripcion", error: error.message });
  }
}

export const actualizarInscripcion = async (req: Request, res: Response): Promise<void> => {
  
  const queryRunner: QueryRunner = AppdataSource.createQueryRunner();
  await queryRunner.startTransaction();

  try {
    const { curso_id, estudiante_id, nota } = req.body;

    const inscripcionBody = inscripcionRepository.create({ curso_id, estudiante_id, nota });

    try {
      await validateOrReject(inscripcionBody);
    } catch (validationErrors: any) {
      manejarErroresDeValidacion(validationErrors, res, 'inscripcion');
      return;
    }

    const inscripcion: Inscripcion | null = await queryRunner.manager.findOne(Inscripcion, { where: { curso_id: inscripcionBody.curso_id, estudiante_id: inscripcionBody.estudiante_id } });

    if (!inscripcion) {
      res.status(404).json({ message: 'Inscripción no encontrada' });
      return;
    }

    const result: UpdateResult = await queryRunner.manager.update(Inscripcion, { curso_id, estudiante_id }, { nota: inscripcionBody.nota });

    if (result.affected === 0) {
      await queryRunner.rollbackTransaction();
      res.status(404).json({ message: 'Inscripcion no actualizada' });
      return;
    }

    await queryRunner.commitTransaction();
    res.status(200).json({ message: 'Inscripción actualizada exitosamente' });
  } catch (error: any) {

    try {

      await queryRunner.rollbackTransaction();
      
    } catch (rollbackError: any) {
      res.status(500).json({ message: 'Error al realizar el rollback de la transacción', error: rollbackError.message });
      return;
    }
    res.status(500).json({ message: 'Error al actualizar la inscripción', error: error.message });
  } finally {
    await queryRunner.release();
  }
}

export const eliminarInscripcion = async (req: Request, res: Response) => {
  
  const queryRunner: QueryRunner = AppdataSource.createQueryRunner();

  await queryRunner.startTransaction();

  try {

    const { curso_id, estudiante_id } = req.body;

    const inscripcionBody = inscripcionRepository.create({ curso_id, estudiante_id });

    await validateOrReject(inscripcionBody);

    const inscripcion: Inscripcion | null = await queryRunner.manager.findOne(Inscripcion, { where: { curso_id: inscripcionBody.curso_id, estudiante_id: inscripcionBody.estudiante_id } });

    if (!inscripcion) {
      await queryRunner.rollbackTransaction();
      return res.status(404).json({ message: 'Inscripcion no encontrada' });
    }

    const result: DeleteResult = await queryRunner.manager.delete(Inscripcion, { curso_id: inscripcionBody.curso_id, estudiante_id: inscripcionBody.estudiante_id });

    if (result.affected === 0) {
      await queryRunner.rollbackTransaction();
      return res.status(404).json({ message: 'No se pudo eliminar la inscripcion' });
    }

    await queryRunner.commitTransaction();
    res.status(200).json({ message: 'Inscripcion eliminada' });
  } catch (error: any) {

    try {
      await queryRunner.rollbackTransaction();
    } catch (rollbackError: any) {
      return res.status(500).json({ message: 'Error al realizar el rollback de la transacción', error: rollbackError.message, });
    }

    res.status(500).json({ message: 'Error al eliminar la inscripción', error: error.message });
  } finally {
    await queryRunner.release();
  }
}
