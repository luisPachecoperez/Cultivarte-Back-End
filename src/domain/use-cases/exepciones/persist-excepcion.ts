import { EditarExcepciones } from '@/domain/entities/excepciones';
import { RespuestaGrap } from '@/domain/entities/respuesta';
import { ExcepcionesRepository } from '@/domain/repositories/excepciones-repository';

export interface PersistExcepcionUseCase {
  execute(excepcion: EditarExcepciones): Promise<RespuestaGrap>;
}

export class PersistExcepcionUseCaseImpl implements PersistExcepcionUseCase {
  constructor(private readonly excepcionesRepository: ExcepcionesRepository) {}

  async execute(excepcion: EditarExcepciones): Promise<RespuestaGrap> {
    try {
      return await this.excepcionesRepository.UpdateExcepciones(excepcion);
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje: error instanceof Error ? error.message : JSON.stringify(error),
      };
    }
  }
}
