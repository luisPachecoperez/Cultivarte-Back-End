import { SesionRepository, EditarSesiones, RespuestaGrap } from '../../';
export interface UpdateSesionesUseCase {
    execute(editarSesiones: EditarSesiones): Promise<RespuestaGrap>;
}
export declare class UpdateSesionesUseCaseImpl implements UpdateSesionesUseCase {
    private readonly sesionRepository;
    constructor(sesionRepository: SesionRepository);
    execute(editarSesiones: EditarSesiones): Promise<RespuestaGrap>;
}
