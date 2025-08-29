import { EditarSesiones, RespuestaGrap, Sesion } from '../';

export interface SesionesDataSource {
    getAll(): Promise<Sesion[]>;
    getById( id_sesion: string ): Promise<Sesion | null>;
    createSesion( sesion: Sesion ): Promise<Sesion>;
    updateById( id_sesion: string, sesion: Sesion ): Promise<RespuestaGrap>;
    updateSesiones( editarSesiones: EditarSesiones ): Promise<RespuestaGrap>;
    deleteById( id_sesion: string ): Promise<boolean>;

}