import { RespuestaGrap, Sesion, SesionRepository } from '../../';
export interface GetSesionesSedesUseCase {
    execute(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Sesion[] | RespuestaGrap>;
}
export declare class GetSesionesSedesUseCaseImpl implements GetSesionesSedesUseCase {
    private readonly sesionesRepository;
    constructor(sesionesRepository: SesionRepository);
    execute(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Sesion[] | RespuestaGrap>;
}
