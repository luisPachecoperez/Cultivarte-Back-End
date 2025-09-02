import { PersonaSede,
         RespuestaGrap,
         PersonasSedesRepository } from "../../";

export interface UpdatePersonaSedeUseCase {
    execute(id_sede: string, personaSede: PersonaSede): Promise<RespuestaGrap>;
}   

export class UpdatePersonaSedeUseCaseImpl implements UpdatePersonaSedeUseCase {
    constructor(
        private personaSedeRepository: PersonasSedesRepository
    ) {}

    execute(id_sede: string, personaSede: PersonaSede): Promise<RespuestaGrap> {
        return this.personaSedeRepository.updateById(id_sede, personaSede);
    }
}