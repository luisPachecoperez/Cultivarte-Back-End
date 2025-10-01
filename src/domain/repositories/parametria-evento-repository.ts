import { ParametriaEventos } from "../";

export interface ParametriaEventosRepository {
  getAll(): Promise<ParametriaEventos>;
}
