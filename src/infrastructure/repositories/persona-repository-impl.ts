import {
  PersonaRepository,
  Persona,
  RespuestaGrap,
  PersonaDataSource,
} from '../../domain';

export class PersonaRepositoryImpl implements PersonaRepository {
  constructor(private readonly personaDataSource: PersonaDataSource) {}

  async getAll(
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap> {
    try {
      const result = await this.personaDataSource.getAll(limit, offset);
      return Array.isArray(result) ? result : [];
    } catch (error: unknown) {
      console.error('Error en getAll:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener personas: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async getById(id_persona: string): Promise<Persona | RespuestaGrap> {
    try {
      const result = await this.personaDataSource.getById(id_persona);
      return result;
    } catch (error: unknown) {
      console.error('Error en getById:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap> {
    try {
      const result = await this.personaDataSource.getAliadosSede(id_usuario);
      return Array.isArray(result) ? result : [];
    } catch (error: unknown) {
      console.error('Error en getAliadosSede:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener aliados: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async getBenSedes(): Promise<Persona[] | RespuestaGrap> {
    try {
      const result = await this.personaDataSource.getBenSedes();
      return Array.isArray(result) ? result : [];
    } catch (error: unknown) {
      console.error('Error en getBenSedes:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener beneficiarios: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async createPersona(persona: Persona): Promise<Persona | RespuestaGrap> {
    try {
      const result = await this.personaDataSource.createPersona(persona);
      return result;
    } catch (error: unknown) {
      console.error('Error en createPersona:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo crear persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async updatePersona(
    id_persona: string,
    persona: Persona,
  ): Promise<Persona | RespuestaGrap> {
    try {
      const result = await this.personaDataSource.updatePersona(
        id_persona,
        persona,
      );
      return result;
    } catch (error: unknown) {
      console.error('Error en updatePersona:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo actualizar persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async deletePersona(id_persona: string): Promise<RespuestaGrap> {
    try {
      const result = await this.personaDataSource.deletePersona(id_persona);
      return result;
    } catch (error: unknown) {
      console.error('Error en deletePersona:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo eliminar persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async getBeneficiarios(): Promise<Persona[] | RespuestaGrap> {
    try {
      const result = await this.personaDataSource.getBeneficiarios();
      return Array.isArray(result) ? result : [];
    } catch (error: unknown) {
      console.error('Error en getBeneficiarios:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener beneficiarios: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }
}
