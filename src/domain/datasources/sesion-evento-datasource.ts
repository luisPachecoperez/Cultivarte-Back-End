import { SesionEvento } from "../entities/sesiones-eventos";

export interface SesionEventoDataSource {
    getAll(): Promise<SesionEvento[]>;
}