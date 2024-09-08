import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsInt, IsNotEmpty, Min, Max, validateOrReject } from 'class-validator';
import { Estudiante } from './estudianteModel';
import { Curso } from './cursoModel';

@Entity('cursos_estudiantes')
export class Inscripcion {

    @PrimaryColumn()
    @IsInt({ message: 'Debe ser un número entero' })
    estudiante_id: number;

    @PrimaryColumn()
    @IsInt({ message: 'Debe ser un número entero' })
    curso_id: number;

    @ManyToOne(() => Curso, curso => curso.inscripciones)
    @JoinColumn({ name: 'curso_id' })
    curso: Curso;

    @ManyToOne(() => Estudiante, estudiante => estudiante.inscripciones)
    @JoinColumn({ name: 'estudiante_id' })
    estudiante: Estudiante;

    @Column()
    @IsNotEmpty({ message: 'La nota no puede estar vacía' })
    @IsInt({ message: 'Debe ser un número entero' })
    @Min(0, { message: 'La nota debe ser al menos 0' })
    @Max(10, { message: 'La nota no puede ser mayor a 10' })
    nota: number;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}