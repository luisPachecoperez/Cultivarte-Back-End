import { PersonasSede,
         RespuestaGrap,
         PersonasSedesRepository, 
         PersonaSede} from "../../";

export interface UpdatePersonaSedeUseCase {
    execute(id_personas_sede: string, personaSede: PersonasSede): Promise<RespuestaGrap>;
}   

export class UpdatePersonaSedeUseCaseImpl implements UpdatePersonaSedeUseCase {
    constructor(
        private personaSedeRepository: PersonasSedesRepository
    ) {}

    execute(id_personas_sede: string, personasSede: PersonasSede): Promise<RespuestaGrap> {
        return this.personaSedeRepository.updateById(id_personas_sede, personasSede);
    }
}