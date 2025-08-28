import { SesionRepository, 
         SesionesDataSource, 
         Sesion, 
         EditarSesiones} from "../../domain";

export class SesionesRepositoryImpl implements SesionRepository {
    
    constructor(
        private sesionesDataSource: SesionesDataSource
    ) {}

    async getAll(): Promise<Sesion[]> {
        return this.sesionesDataSource.getAll();
    }

    async getById(id_sesion: string): Promise<Sesion | null> {
        return this.sesionesDataSource.getById(id_sesion);
    }

    async createSesion(sesion: Sesion): Promise<Sesion> {
        return this.sesionesDataSource.createSesion(sesion);
    }

    async updateById(id_sesion: string, sesion: Sesion): Promise<Sesion | null> {
        return this.sesionesDataSource.updateById(id_sesion, sesion);
    }

    async deleteById(id_sesion: string): Promise<boolean> {
        return this.sesionesDataSource.deleteById(id_sesion);
    }

    async updateSesiones(editarSesiones: EditarSesiones): Promise<boolean> {
        return this.sesionesDataSource.updateSesiones(editarSesiones);
    }
}
