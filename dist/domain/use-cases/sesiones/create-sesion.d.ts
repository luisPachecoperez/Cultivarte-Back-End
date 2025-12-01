import { Sesion, SesionRepository, RespuestaGrap } from '../../';
export interface CreateSesionUseCase {
    execute(sesion: Sesion): Promise<RespuestaGrap>;
}
export declare class CreateSesionUseCaseImpl implements CreateSesionUseCase {
    private readonly sesionRepository;
    constructor(sesionRepository: SesionRepository);
    execute(sesion: Sesion): Promise<RespuestaGrap>;
}
