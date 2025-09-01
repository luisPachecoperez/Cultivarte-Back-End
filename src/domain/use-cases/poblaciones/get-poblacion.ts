import { Poblacion, 
         RespuestaGrap,
         PoblacionRepository } from "../../";

export interface GetPoblacionUseCase {
    execute( id_poblacion: string ): Promise<Poblacion | RespuestaGrap>;
}

export class GetPoblacionUseCaseImpl implements GetPoblacionUseCase {
    constructor( private readonly poblacionRepository: PoblacionRepository ) {}

    async execute( id_poblacion: string ): Promise<Poblacion | RespuestaGrap> {
        return this.poblacionRepository.getPoblacionById( id_poblacion );
    }
}