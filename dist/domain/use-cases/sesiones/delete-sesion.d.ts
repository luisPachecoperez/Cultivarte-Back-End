import { RespuestaGrap, SesionRepository } from '../../';
export interface DeleteSesionUseCase {
    execute(id_sesion: string): Promise<RespuestaGrap>;
}
export declare class DeleteSesionUseCaseImpl implements DeleteSesionUseCase {
    private readonly sesionRepository;
    constructor(sesionRepository: SesionRepository);
    execute(id_sesion: string): Promise<RespuestaGrap>;
}
