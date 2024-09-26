import { Router } from 'express';
import { obtenerInscripciones, obtenerInscripcionesPorCurso, obtenerInscripcionesPorEstudiante, guardarInscripcion, actualizarInscripcion, eliminarInscripcion } from '../controllers/inscripcionController';

const router = Router();

router.get('/inscripciones', obtenerInscripciones);
router.get('/Inscripciones/curso/:id', obtenerInscripcionesPorCurso);
router.get('/Inscripciones/estudiante/:id', obtenerInscripcionesPorEstudiante);
router.post('/inscripciones', guardarInscripcion);
router.put('/inscripciones', actualizarInscripcion);
router.delete('/inscripciones/:estudiante_id/:curso_id', eliminarInscripcion);

export default router;