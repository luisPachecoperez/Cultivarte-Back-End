import { GetPersonaSedeUseCase, GetPersonasSedesUseCase, CreatePersonaSedeUseCase, UpdatePersonaSedeUseCase, DeletePersonaSedeUseCase, RespuestaGrap, PersonasSede } from '../../domain';
export declare class PersonasSedesController {
    private readonly getPersonaSedeUseCase;
    private readonly getPersonasSedesUseCase;
    private readonly createPersonaSedeUseCase;
    private readonly updatePersonaSedeUseCase;
    private readonly deletePersonaSedeUseCase;
    constructor(getPersonaSedeUseCase: GetPersonaSedeUseCase, getPersonasSedesUseCase: GetPersonasSedesUseCase, createPersonaSedeUseCase: CreatePersonaSedeUseCase, updatePersonaSedeUseCase: UpdatePersonaSedeUseCase, deletePersonaSedeUseCase: DeletePersonaSedeUseCase);
    getAll(): Promise<PersonasSede[] | RespuestaGrap>;
    getById(id_sede: string): Promise<PersonasSede | RespuestaGrap>;
    create(personaSede: PersonasSede): Promise<PersonasSede | RespuestaGrap>;
    update(id_sede: string, personaSede: PersonasSede): Promise<PersonasSede | RespuestaGrap>;
    delete(id_sede: string): Promise<PersonasSede | RespuestaGrap>;
}
