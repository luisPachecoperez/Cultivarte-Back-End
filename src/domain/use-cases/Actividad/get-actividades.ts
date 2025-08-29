import { Actividad, ActividadRepository } from "../../";

export interface GetActividadesUseCase {
    execute(): Promise<Actividad[]>;
}

export class GetActividadesUseCaseImpl implements GetActividadesUseCase {
    
    constructor( 
        private actividadRepository: ActividadRepository
    ) {}

    execute(): Promise<Actividad[]> {
        return this.actividadRepository.getAll();
    }
}