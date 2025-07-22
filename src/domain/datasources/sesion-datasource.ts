import { Sesion } from "../";

export interface SesionDataSource {
    getAll(): Promise<Sesion[]>;
    getById( id_sesion: string ): Promise<Sesion | null>;
    create( sesion: Sesion ): Promise<Sesion>;
    updateById( id_sesion: string, sesion: Sesion ): Promise<Sesion>;
    deleteById( id_sesion: string ): Promise<boolean>;
}