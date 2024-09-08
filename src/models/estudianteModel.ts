import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Matches, NotContains, validateOrReject } from 'class-validator';
import { Inscripcion } from './inscripcionModel';

@Entity('estudiantes')
export class Estudiante {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
    @Matches(/^\d{7,8}$/, { message: 'Debe tener entre 7 y 8 dígitos numéricos' })
    dni: string;

    @Column()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Matches(/^[A-Za-z\s]+$/, { message: 'Debe ser una cadena de texto con solo letras y espacios' })
    nombre: string;

    @Column()
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    @Matches(/^[A-Za-z\s]+$/, { message: 'Debe ser una cadena de texto con solo letras y espacios' })
    apellido: string;

    @Column()
    @IsEmail({}, { message: 'No tiene un formato válido' })
    email: string;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Inscripcion, inscripcion => inscripcion.estudiante)
    inscripciones: Inscripcion[];
}