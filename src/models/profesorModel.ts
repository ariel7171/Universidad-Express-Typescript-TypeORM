import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Matches, validateOrReject } from 'class-validator';
import { Curso } from './cursoModel';

@Entity('profesores')
export class Profesor {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
    @Matches(/^\d{7,8}$/, { message: 'Debe tener entre 7 y 8 dígitos numéricos' })
    dni: string;

    @Column()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'Debe ser una cadena de texto' })
    nombre: string;

    @Column()
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    @IsString({ message: 'Debe ser una cadena de texto' })
    apellido: string;

    @Column()
    @IsEmail({}, { message: 'No tiene un formato válido' })
    email: string;

    @Column()
    @IsNotEmpty({ message: 'La profesión no puede estar vacía' })
    @IsString({ message: 'Debe ser una cadena de texto' })
    profesion: string;

    @Column()
    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    @Matches(/^\d{10}$/, { message: 'Debe tener 10 dígitos numéricos' })
    telefono: string;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Curso, curso => curso.profesor)
    cursos: Curso[];
}