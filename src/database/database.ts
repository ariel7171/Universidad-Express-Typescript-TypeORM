import { DataSource } from 'typeorm';
import { Estudiante } from '../models/estudianteModel';
import { Profesor } from '../models/profesorModel';
import { Inscripcion } from '../models/inscripcionModel';
import { Curso } from '../models/cursoModel';

const AppdataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'universidad2',
  entities: [Estudiante, Profesor, Curso, Inscripcion],
  synchronize: true
});

export default AppdataSource;