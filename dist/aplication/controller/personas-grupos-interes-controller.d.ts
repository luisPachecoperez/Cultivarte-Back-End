import { DeletePersonaGrupoInteresUseCase, GetPersonaGrupoInteresUseCase, GetPersonasGrupoInteresUseCase, UpdatePersonaGrupoInteresUseCase, CreatePersonaGrupoInteresUseCase, PersonaGrupoInteres, RespuestaGrap } from '../../domain';
export declare class PersonasGruposInteresController {
    private readonly getPersonaGrupoInteresByIdUseCase;
    private readonly getPersonasGrupoInteresUseCase;
    private readonly createPersonaGrupoInteresUseCase;
    private readonly updatePersonaGrupoInteresUseCase;
    private readonly deletePersonaGrupoInteresUseCase;
    constructor(getPersonaGrupoInteresByIdUseCase: GetPersonaGrupoInteresUseCase, getPersonasGrupoInteresUseCase: GetPersonasGrupoInteresUseCase, createPersonaGrupoInteresUseCase: CreatePersonaGrupoInteresUseCase, updatePersonaGrupoInteresUseCase: UpdatePersonaGrupoInteresUseCase, deletePersonaGrupoInteresUseCase: DeletePersonaGrupoInteresUseCase);
    getPersonaGrupoInteresById(id_persona_grupo_interes: string): Promise<PersonaGrupoInteres | RespuestaGrap>;
    getPersonasGrupoInteres(): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
    createPersonaGrupoInteres(personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
    updatePersonaGrupoInteres(id_persona_grupo_interes: string, personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
    deletePersonaGrupoInteres(id_persona_grupo_interes: string): Promise<RespuestaGrap>;
}
