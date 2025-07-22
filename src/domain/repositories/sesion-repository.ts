import { Sesion } from "../";

export interface SesionRepository {
    getAll(): Promise<Sesion[]>;
    getById( id_sesion: string ): Promise<Sesion | null>;
    create( sesion: Sesion ): Promise<Sesion>;
    updateById( id_sesion: string, sesion: Sesion ): Promise<Sesion>;
    deleteById( id_sesion: string ): Promise<boolean>;
}