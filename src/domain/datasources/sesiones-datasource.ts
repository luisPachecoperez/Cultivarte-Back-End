import { EditarSesiones } from './../entities/editar-sesiones';
import { Sesion } from "../";

export interface SesionesDataSource {
    getAll(): Promise<Sesion[]>;
    getById( id_sesion: string ): Promise<Sesion | null>;
    createSesion( sesion: Sesion ): Promise<Sesion>;
    updateById( id_sesion: string, sesion: Sesion ): Promise<Sesion | null>;
    updateSesiones( editarSesiones: EditarSesiones ): Promise<boolean>;
    deleteById( id_sesion: string ): Promise<boolean>;

}