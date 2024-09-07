import { Router } from 'express';
import { obtenerEstudiantes, obtenerEstudiantePorId, guardarEstudiante, actualizarEstudiante, eliminarEstudiante } from '../controllers/estudianteController';

const router = Router();

router.get('/estudiantes', obtenerEstudiantes);
router.post('/estudiantes', guardarEstudiante);

router.route('/estudiantes/:id')
    .get(obtenerEstudiantePorId)
    .put(actualizarEstudiante)
    .delete(eliminarEstudiante);

export default router;