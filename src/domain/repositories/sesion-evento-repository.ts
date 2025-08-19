import { SesionEvento } from "../entities/sesiones-eventos";

export interface SesionesEventoRepository {
    getAll(): Promise<SesionEvento[]>;
  
}