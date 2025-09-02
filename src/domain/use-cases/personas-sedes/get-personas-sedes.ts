import { PersonaSede,
         RespuestaGrap,
         PersonasSedesRepository } from "../../";

export interface GetPersonasSedesUseCase {
    execute(): Promise<PersonaSede[] | RespuestaGrap>;
}
    
export class GetPersonasSedesUseCaseImpl implements GetPersonasSedesUseCase {
    constructor(
        private personaSedeRepository: PersonasSedesRepository
    ) {}

    execute(): Promise<PersonaSede[] | RespuestaGrap> {
        return this.personaSedeRepository.getAll();
    }
}