import { RespuestaGrap } from '@/domain';
import {
  EditarExcepciones,
  ExcepcionModificable,
} from '@/domain/entities/excepciones';
import { GetExcepcionesUseCase } from '@/domain/use-cases/exepciones/get-excepciones';
import { PersistExcepcionUseCase } from '@/domain/use-cases/exepciones/persist-excepcion';

export class ExcepcionesController {
  constructor(
    private readonly getExcepcionesUseCase: GetExcepcionesUseCase,
    private readonly persistExcepcionUseCase: PersistExcepcionUseCase,
  ) {}

  async getExcepciones(): Promise<ExcepcionModificable[] | RespuestaGrap> {
    return this.getExcepcionesUseCase.execute();
  }

  async persistExcepcion(excepcion: EditarExcepciones): Promise<RespuestaGrap> {
    console.log('Controller - persistExcepcion called with:', excepcion);
    return this.persistExcepcionUseCase.execute(excepcion);
  }
}
