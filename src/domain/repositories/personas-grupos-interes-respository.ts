import { PersonaGrupoInteres, RespuestaGrap } from "../";

export interface PersonasGruposInteresRepository {
    getAll(): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
    getById( id_sede: string ): Promise<PersonaGrupoInteres | RespuestaGrap>;
    create( personaSede: PersonaGrupoInteres ): Promise<RespuestaGrap>;
    updateById( id_sede: string, personaSede: PersonaGrupoInteres ): Promise<RespuestaGrap>;
    deleteById( id_sede: string ): Promise<RespuestaGrap>;
}