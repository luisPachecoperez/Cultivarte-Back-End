import { EditarSesiones, Sesion } from "../";

export interface SesionRepository {
    getAll(): Promise<Sesion[]>;
    getById( id_sesion: string ): Promise<Sesion | null>;
    createSesion( sesion: Sesion ): Promise<Sesion>;
    updateById( id_sesion: string, sesion: Sesion ): Promise<Sesion | null>;
    updateSesiones( editarSesiones: EditarSesiones ): Promise<boolean>;
    deleteById( id_sesion: string ): Promise<boolean>;
}