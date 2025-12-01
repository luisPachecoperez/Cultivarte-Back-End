import { RespuestaGrap, SesionesDataSource } from '../../domain';
import { Sesion } from '../../domain/entities/sesion';
import { EditarSesiones } from '../../domain/entities/editar-sesiones';
export declare class SesionesDataSourceImpl implements SesionesDataSource {
    private readonly pool;
    getAll(limit: number, offset: number): Promise<Sesion[] | RespuestaGrap>;
    getById(id_sesion: string): Promise<Sesion | RespuestaGrap>;
    getSesionesSede(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Sesion[] | RespuestaGrap>;
    createSesion(sesion: Sesion): Promise<RespuestaGrap>;
    updateById(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap>;
    deleteById(id_sesion: string): Promise<RespuestaGrap>;
    updateSesiones(editarSesiones: EditarSesiones): Promise<RespuestaGrap>;
}
