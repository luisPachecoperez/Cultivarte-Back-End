import { PersonaGrupoInteres, RespuestaGrap } from '../';

export interface PersonasGruposInteresDataSource {
  getAll(): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
  getById(
    id_persona_grupo_interes: string,
  ): Promise<PersonaGrupoInteres | RespuestaGrap>;
  create(personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
  updateById(
    id_persona_grupo_interes: string,
    personaGrupoInteres: PersonaGrupoInteres,
  ): Promise<RespuestaGrap>;
  deleteById(id_persona_grupo_interes: string): Promise<RespuestaGrap>;
}
