import { ExcepcionesDataSource } from '@/domain/datasources/excepciones-datasource';
import {
  EditarExcepciones,
  ExcepcionModificable,
} from '@/domain/entities/excepciones';
import { RespuestaGrap } from '@/domain/entities/respuesta';
import { ExcepcionesRepository } from '@/domain/repositories/excepciones-repository';

export class ExcepcionesRepositoryImpl implements ExcepcionesRepository {
  constructor(private readonly excepcionesDataSource: ExcepcionesDataSource) {}

  async getExcepciones(): Promise<ExcepcionModificable[] | RespuestaGrap> {
    return this.excepcionesDataSource.getExcepciones();
  }

  async UpdateExcepciones(
    excepciones: EditarExcepciones,
  ): Promise<RespuestaGrap> {
    return this.excepcionesDataSource.UpdateExcepciones(excepciones);
  }
}
