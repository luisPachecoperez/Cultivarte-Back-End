import { SesionEventoDataSource } from "../../domain/datasources/sesion-evento-datasource";
import { SesionEvento } from "../../domain/entities/sesiones-eventos";
import { SesionesEventoRepository } from "../../domain/repositories/sesion-evento-repository";

export class sesionEventoRepositoryImpl implements  SesionesEventoRepository {
    constructor(
        private sesionEventoDataSource: SesionEventoDataSource
    ) {}

    getAll(): Promise<SesionEvento[]> {
        throw new Error("Method not implemented.");
    }
    
}