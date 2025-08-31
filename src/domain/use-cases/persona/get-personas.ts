import { Persona,
         PersonaRepository,
         RespuestaGrap } from "../../";

export interface GetPersonasUseCase {
    execute(): Promise<Persona[] | RespuestaGrap>;
}

export class GetPersonasUseCaseImpl implements GetPersonasUseCase {
    
    constructor( private readonly personasRepository: PersonaRepository ) {}

    async execute(): Promise<Persona[] | RespuestaGrap> {
        return this.personasRepository.getAll();
    }
}