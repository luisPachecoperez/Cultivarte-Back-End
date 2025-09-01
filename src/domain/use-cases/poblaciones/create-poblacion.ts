import { Poblacion, 
         RespuestaGrap,
         PoblacionRepository } from "../../";

export interface CreatePoblacionUseCase {
    execute( poblacion: Poblacion ): Promise<Poblacion | RespuestaGrap>;
}

export class CreatePoblacionUseCaseImpl implements CreatePoblacionUseCase {
    constructor( private readonly poblacionRepository: PoblacionRepository ) {}

    async execute( poblacion: Poblacion ): Promise<Poblacion | RespuestaGrap> {
        return this.poblacionRepository.createPoblacion( poblacion );
    }
}