import app from './app';
import AppdataSource from './database/database';

const PORT = process.env.PORT || 4000;

const main = async (): Promise<void> => {
    try {
        await AppdataSource.initialize();
        console.log('La base de datos ha sido inicializada');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al inicializar la base de datos: ', error);
        process.exit(1);
    }
};

main();
