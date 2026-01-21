import {
  EditarExcepciones,
  ExcepcionModificable,
} from '../entities/excepciones';
import { RespuestaGrap } from '../entities/respuesta';

export interface ExcepcionesRepository {
  getExcepciones(): Promise<ExcepcionModificable[] | RespuestaGrap>;
  UpdateExcepciones(excepciones: EditarExcepciones): Promise<RespuestaGrap>;
}
