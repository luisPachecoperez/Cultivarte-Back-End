import { Actividad, ActividadRepository, RespuestaGrap } from "../../";

export interface GetActividadesUseCase {
    execute(): Promise<Actividad[] | RespuestaGrap>;
}

export class GetActividadesUseCaseImpl implements GetActividadesUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository
    ) {}

    execute(): Promise<Actividad[] | RespuestaGrap> {
        return this.actividadRepository.getAll();
    }
}