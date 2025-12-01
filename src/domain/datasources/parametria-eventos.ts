import { ParametriaEventos } from '../';

export interface ParametriaEventosDataSource {
  getAll(): Promise<
    Array<{ grupo: keyof ParametriaEventos; id: string; nombre: string }>
  >;
}
