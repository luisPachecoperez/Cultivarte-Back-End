import { RespuestaGrap, Poblacion } from '../';

export interface PoblacionRepository {
  createPoblacion(poblacion: Poblacion): Promise<RespuestaGrap>;
  updatePoblacionById(
    id_poblacion: string,
    poblacion: Poblacion,
  ): Promise<RespuestaGrap>;
  deletePoblacionById(id_poblacion: string): Promise<RespuestaGrap>;
  getPoblaciones(): Promise<Poblacion[] | RespuestaGrap>;
  getPoblacionById(id_poblacion: string): Promise<Poblacion | RespuestaGrap>;
}
