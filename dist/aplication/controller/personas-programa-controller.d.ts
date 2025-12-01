import { CreatePersonaProgramaUseCase, DeletePersonaProgramaUseCase, GetPersonaProgramaUseCase, GetPersonasProgramaUseCase, UpdatePersonaProgramaUseCase, PersonaPrograma, RespuestaGrap } from '../../domain';
export declare class PersonasProgramaController {
    private readonly createPersonaProgramaUseCase;
    private readonly updatePersonaProgramaUseCase;
    private readonly deletePersonaProgramaUseCase;
    private readonly getPersonaProgramaUseCase;
    private readonly getPersonasProgramaUseCase;
    constructor(createPersonaProgramaUseCase: CreatePersonaProgramaUseCase, updatePersonaProgramaUseCase: UpdatePersonaProgramaUseCase, deletePersonaProgramaUseCase: DeletePersonaProgramaUseCase, getPersonaProgramaUseCase: GetPersonaProgramaUseCase, getPersonasProgramaUseCase: GetPersonasProgramaUseCase);
    createPersonaPrograma(personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
    updatePersonaPrograma(id_persona_programa: string, personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
    deletePersonaPrograma(id_persona_programa: string): Promise<RespuestaGrap>;
    getPersonaPrograma(id_persona_programa: string): Promise<PersonaPrograma | RespuestaGrap>;
    getPersonasPrograma(): Promise<PersonaPrograma[] | RespuestaGrap>;
}
