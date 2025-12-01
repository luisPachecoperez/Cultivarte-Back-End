import { Actividad, ActividadRepository, RespuestaGrap } from '../..';
export interface GetActividadesUseCase {
    execute(limit: number, offset: number): Promise<Actividad[] | RespuestaGrap>;
}
export declare class GetActividadesUseCaseImpl implements GetActividadesUseCase {
    private readonly actividadRepository;
    constructor(actividadRepository: ActividadRepository);
    execute(limit: number, offset: number): Promise<Actividad[] | RespuestaGrap>;
}
