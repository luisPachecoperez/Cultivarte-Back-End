import { RespuestaGrap, PersonaPrograma } from "../";

export interface PersonasProgramaDataSource {
    getAll(): Promise<PersonaPrograma[] | RespuestaGrap>;
    getById( id_persona: string ): Promise<PersonaPrograma | RespuestaGrap>;
    create( personasPrograma: PersonaPrograma ): Promise<RespuestaGrap>;
    updateById( id_persona: string, personasPrograma: PersonaPrograma ): Promise<RespuestaGrap>;
    deleteById( id_persona: string ): Promise<RespuestaGrap>;
}