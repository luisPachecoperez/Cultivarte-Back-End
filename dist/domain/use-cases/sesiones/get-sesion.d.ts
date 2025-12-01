import { Sesion, SesionRepository, RespuestaGrap } from '../../';
export interface GetSesionUseCase {
    execute(id_sesion: string): Promise<Sesion | RespuestaGrap>;
}
export declare class GetSesionUseCaseImpl implements GetSesionUseCase {
    private readonly sesionRepository;
    constructor(sesionRepository: SesionRepository);
    execute(id_sesion: string): Promise<Sesion | RespuestaGrap>;
}
