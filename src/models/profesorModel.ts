import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Curso } from './cursoModel';

@Entity('profesores')
export class Profesor {
    @PrimaryGeneratedColumn()
    id: number | undefined;;

    @Column()
    dni: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;

    @Column()
    profesion: string;

    @Column()
    telefono: string;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Curso, curso => curso.profesor)
    cursos: Curso[];
}