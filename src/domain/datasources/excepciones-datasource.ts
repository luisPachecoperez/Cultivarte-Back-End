import {
  EditarExcepciones,
  ExcepcionModificable,
} from '../entities/excepciones';
import { RespuestaGrap } from '../entities/respuesta';

export interface ExcepcionesDataSource {
  getExcepciones(): Promise<ExcepcionModificable[] | RespuestaGrap>;
  UpdateExcepciones(excepciones: EditarExcepciones): Promise<RespuestaGrap>;
}
