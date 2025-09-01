import { PoblacionRepository, 
         RespuestaGrap } from "../../";

export interface DeletePoblacionUseCase {
    execute( id_poblacion: string ): Promise<RespuestaGrap>;
}

export class DeletePoblacionUseCaseImpl implements DeletePoblacionUseCase {
    constructor( private readonly poblacionRepository: PoblacionRepository ) {}

    async execute( id_poblacion: string ): Promise<RespuestaGrap> {
        return this.poblacionRepository.deletePoblacionById( id_poblacion );
    }
}