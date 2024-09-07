import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Inscripcion } from './inscripcionModel';
import { Profesor } from './profesorModel';

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id: number | undefined;;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @ManyToOne(() => Profesor, profesor => profesor.cursos)
    profesor: Profesor;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Inscripcion, inscripcion => inscripcion.curso)
    inscripciones: Inscripcion[];

}