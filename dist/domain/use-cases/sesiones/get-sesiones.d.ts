import { Sesion, SesionRepository, RespuestaGrap } from '../../';
export interface GetSesionesUseCase {
    execute(limit: number, offset: number): Promise<Sesion[] | RespuestaGrap>;
}
export declare class GetSesionesUseCaseImpl implements GetSesionesUseCase {
    private readonly sesionRepository;
    constructor(sesionRepository: SesionRepository);
    execute(limit: number, offset: number): Promise<Sesion[] | RespuestaGrap>;
}
