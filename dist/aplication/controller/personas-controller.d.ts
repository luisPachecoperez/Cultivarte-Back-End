import { Persona, CreatePersonaUseCase, UpdatePersonaUseCase, DeletePersonaUseCase, GetPersonaUseCase, GetPersonasUseCase, GetAliadosSedeUseCase, GetBeneficiariosSedeUseCase, RespuestaGrap } from '../../domain';
export declare class PersonasController {
    private readonly getPersonaUseCase;
    private readonly getPersonasUseCase;
    private readonly getAliadosSedeUseCase;
    private readonly getBeneficiariosSedeUseCase;
    private readonly createPersonaUseCase;
    private readonly updatePersonaUseCase;
    private readonly deletePersonaUseCase;
    constructor(getPersonaUseCase: GetPersonaUseCase, getPersonasUseCase: GetPersonasUseCase, getAliadosSedeUseCase: GetAliadosSedeUseCase, getBeneficiariosSedeUseCase: GetBeneficiariosSedeUseCase, createPersonaUseCase: CreatePersonaUseCase, updatePersonaUseCase: UpdatePersonaUseCase, deletePersonaUseCase: DeletePersonaUseCase);
    createPersona(persona: Persona): Promise<Persona | RespuestaGrap>;
    updatePersona(id_persona: string, persona: Persona): Promise<Persona | RespuestaGrap>;
    deletePersona(id_persona: string): Promise<RespuestaGrap>;
    getPersona(id_persona: string): Promise<Persona | RespuestaGrap>;
    getPersonas(limit: number, offset: number): Promise<Persona[] | RespuestaGrap>;
    getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap>;
    getBenSedes(): Promise<Persona[] | RespuestaGrap>;
}
