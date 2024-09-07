import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Inscripcion } from './inscripcionModel';

@Entity('estudiantes')
export class Estudiante {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    dni: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Inscripcion, inscripcion => inscripcion.estudiante)
    inscripciones: Inscripcion[];

}