import { Router } from 'express';
import { obtenerProfesores, obtenerProfesorPorId, guardarProfesor, actualizarProfesor, eliminarProfesor } from '../controllers/profesorController';

const router = Router();

router.get('/profesores', obtenerProfesores);
router.post('/profesores', guardarProfesor);

router.route('/profesores/:id')
    .get(obtenerProfesorPorId)
    .put(actualizarProfesor)
    .delete(eliminarProfesor);

export default router;