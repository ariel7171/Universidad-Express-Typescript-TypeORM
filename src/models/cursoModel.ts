import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, BeforeInsert, BeforeUpdate, JoinColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsString, Length, validateOrReject } from 'class-validator';
import { Inscripcion } from './inscripcionModel';
import { Profesor } from './profesorModel';

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'Debe ser una cadena de texto' })
    nombre: string;

    @Column()
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    @IsString({ message: 'Debe ser una cadena de texto' })
    @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
    descripcion: string;

    @Column()
    @IsInt({ message: 'Debe ser un número entero' })
    profesor_id: number;

    @ManyToOne(() => Profesor, profesor => profesor.cursos)
    @JoinColumn({ name: 'profesor_id' })
    profesor: Profesor;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Inscripcion, inscripcion => inscripcion.curso)
    inscripciones: Inscripcion[];
}