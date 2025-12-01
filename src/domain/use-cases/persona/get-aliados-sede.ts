import { PersonaRepository, Persona, RespuestaGrap } from '../../';

export interface GetAliadosSedeUseCase {
  execute(id_usuario: string): Promise<Persona[] | RespuestaGrap>;
}

export class GetAliadosSedeUseCaseImpl implements GetAliadosSedeUseCase {
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(id_usuario: string): Promise<Persona[]> {
    try {
      const result = await this.personasRepository.getAliadosSede(id_usuario);
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error('Error en GetAliadosSedeUseCase:', error);
      return [];
    }
  }
}
