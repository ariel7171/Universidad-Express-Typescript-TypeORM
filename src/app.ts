import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import estudianteRoutes from "./routes/estudianteRoutes";
import profesorRoutes from "./routes/profesorRoutes";
import cursoController from "./routes/cursoRoutes";
import inscripcionController from "./routes/inscripcionRoutes";

const app: express.Application = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/universidad', estudianteRoutes);
app.use('/universidad', profesorRoutes);
app.use('/universidad', cursoController);
app.use('/universidad', inscripcionController);

export default app;