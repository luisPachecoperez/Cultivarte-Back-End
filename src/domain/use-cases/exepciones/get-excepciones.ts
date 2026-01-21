import { ExcepcionModificable } from '@/domain/entities/excepciones';
import { RespuestaGrap } from '@/domain/entities/respuesta';
import { ExcepcionesRepository } from '@/domain/repositories/excepciones-repository';

export interface GetExcepcionesUseCase {
  execute(): Promise<ExcepcionModificable[] | RespuestaGrap>;
}

export class GetExcepcionesUseCaseImpl implements GetExcepcionesUseCase {
  constructor(private readonly excepcionesRepository: ExcepcionesRepository) {}

  async execute(): Promise<ExcepcionModificable[] | RespuestaGrap> {
    try {
      return await this.excepcionesRepository.getExcepciones();
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje: error instanceof Error ? error.message : JSON.stringify(error),
      };
    }
  }
}
