import { Router } from 'express';
import { obtenerCursos, obtenerCursoPorId, guardarCurso, actualizarCurso, eliminarCurso } from '../controllers/cursoController';

const router = Router();

router.get('/cursos', obtenerCursos);
router.post('/cursos', guardarCurso);

router.route('/cursos/:id')
    .get(obtenerCursoPorId)
    .put(actualizarCurso)
    .delete(eliminarCurso);

export default router;