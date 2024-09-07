import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Estudiante } from './estudianteModel';
import { Curso } from './cursoModel';

@Entity('cursos_estudiantes')
export class Inscripcion {

    @PrimaryColumn()
    estudiante_id: number;

    @PrimaryColumn() 
    curso_id: number;

    @ManyToOne(() => Curso, curso => curso.inscripciones)
    @JoinColumn({ name: 'curso_id' })
    curso: Curso;

    @ManyToOne(() => Estudiante, estudiante => estudiante.inscripciones)
    @JoinColumn({ name: 'estudiante_id' })
    estudiante: Estudiante;

    @Column()
    nota: number;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}