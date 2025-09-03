import { Persona, PersonaSede, RespuestaGrap } from "../";

export interface PersonaRepository {
    getAll(): Promise<Persona[] | RespuestaGrap>;
    getById( id_persona:string ): Promise<Persona | RespuestaGrap>;
    getAliadosSede(id_usuario:string): Promise<Persona[] | RespuestaGrap>;
    getBeneficiariosSede(): Promise<PersonaSede[] | RespuestaGrap>;
    getBeneficiarios(): Promise<Persona[] | RespuestaGrap>;
    createPersona( persona:Persona ): Promise<Persona | RespuestaGrap>;
    updatePersona( id_persona:string, persona:Persona ): Promise<Persona | RespuestaGrap>;
    deletePersona( id_persona:string ): Promise<RespuestaGrap>;
}