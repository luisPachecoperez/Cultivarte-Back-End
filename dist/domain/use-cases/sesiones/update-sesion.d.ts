import { RespuestaGrap, Sesion, SesionRepository } from '../../';
export interface UpdateSesionUseCase {
    execute(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap>;
}
export declare class UpdateSesionUseCaseImpl implements UpdateSesionUseCase {
    private readonly sesionRepository;
    constructor(sesionRepository: SesionRepository);
    execute(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap>;
}
