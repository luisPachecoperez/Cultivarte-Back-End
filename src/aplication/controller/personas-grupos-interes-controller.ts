import {
  DeletePersonaGrupoInteresUseCase,
  GetPersonaGrupoInteresUseCase,
  GetPersonasGrupoInteresUseCase,
  UpdatePersonaGrupoInteresUseCase,
  CreatePersonaGrupoInteresUseCase,
  PersonaGrupoInteres,
  RespuestaGrap,
} from '../../domain';

export class PersonasGruposInteresController {
  constructor(
    private readonly getPersonaGrupoInteresByIdUseCase: GetPersonaGrupoInteresUseCase,
    private readonly getPersonasGrupoInteresUseCase: GetPersonasGrupoInteresUseCase,
    private readonly createPersonaGrupoInteresUseCase: CreatePersonaGrupoInteresUseCase,
    private readonly updatePersonaGrupoInteresUseCase: UpdatePersonaGrupoInteresUseCase,
    private readonly deletePersonaGrupoInteresUseCase: DeletePersonaGrupoInteresUseCase,
  ) {}

  async getPersonaGrupoInteresById(
    id_persona_grupo_interes: string,
  ): Promise<PersonaGrupoInteres | RespuestaGrap> {
    return this.getPersonaGrupoInteresByIdUseCase.execute(
      id_persona_grupo_interes,
    );
  }

  async getPersonasGrupoInteres(
    limit: number,
    offset: number,
  ): Promise<PersonaGrupoInteres[] | RespuestaGrap> {
    return this.getPersonasGrupoInteresUseCase.execute(limit, offset);
  }

  async createPersonaGrupoInteres(
    personaGrupoInteres: PersonaGrupoInteres,
  ): Promise<RespuestaGrap> {
    return this.createPersonaGrupoInteresUseCase.execute(personaGrupoInteres);
  }

  async updatePersonaGrupoInteres(
    id_persona_grupo_interes: string,
    personaGrupoInteres: PersonaGrupoInteres,
  ): Promise<RespuestaGrap> {
    return this.updatePersonaGrupoInteresUseCase.execute(
      id_persona_grupo_interes,
      personaGrupoInteres,
    );
  }

  async deletePersonaGrupoInteres(
    id_persona_grupo_interes: string,
  ): Promise<RespuestaGrap> {
    return this.deletePersonaGrupoInteresUseCase.execute(
      id_persona_grupo_interes,
    );
  }
}
