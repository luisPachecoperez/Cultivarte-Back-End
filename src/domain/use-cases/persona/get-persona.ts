import { Persona,
         PersonaRepository,
         RespuestaGrap } from "../../";

export interface GetPersonaUseCase {
    execute( id_persona: string ): Promise<Persona | RespuestaGrap>;
}

export class GetPersonaUseCaseImpl implements GetPersonaUseCase {
    
    constructor( private readonly personasRepository: PersonaRepository ) {}

    async execute( id_persona: string ): Promise<Persona | RespuestaGrap> {
        return this.personasRepository.getById( id_persona );
    }
}