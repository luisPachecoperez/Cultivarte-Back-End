import { RespuestaGrap, Sesion, GetSesionUseCase, GetSesionesUseCase, GetSesionesSedesUseCase, CreateSesionUseCase, UpdateSesionUseCase, DeleteSesionUseCase, EditarSesiones, UpdateSesionesUseCase } from '../../domain';
export declare class SesionesController {
    private readonly getSesionesUseCase;
    private readonly getSesionUseCase;
    private readonly getSesionesSedesUseCase;
    private readonly createSesionUseCase;
    private readonly updateSesionUseCase;
    private readonly deleteSesionUseCase;
    private readonly updateSesionesUseCase;
    constructor(getSesionesUseCase: GetSesionesUseCase, getSesionUseCase: GetSesionUseCase, getSesionesSedesUseCase: GetSesionesSedesUseCase, createSesionUseCase: CreateSesionUseCase, updateSesionUseCase: UpdateSesionUseCase, deleteSesionUseCase: DeleteSesionUseCase, updateSesionesUseCase: UpdateSesionesUseCase);
    getSesiones(limit: number, offset: number): Promise<Sesion[] | RespuestaGrap>;
    getSesion(id_sesion: string): Promise<Sesion | RespuestaGrap>;
    getSesionesSedes(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Sesion[] | RespuestaGrap>;
    createSesion(sesion: Sesion): Promise<RespuestaGrap>;
    updateSesion(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap>;
    deleteSesion(id_sesion: string): Promise<RespuestaGrap>;
    updateSesiones(data: EditarSesiones): Promise<RespuestaGrap>;
}
