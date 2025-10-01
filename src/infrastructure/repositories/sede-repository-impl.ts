import { SedeRepository } from "../../domain/repositories/sede-repository";
import { SedeDataSource } from "../../domain/datasources/sede-datasource";
import { RespuestaGrap } from "../../domain/entities/respuesta";
import { Sede } from "../../domain/entities/sede";

export class SedeRepositoryImpl implements SedeRepository {
  constructor(private sedeDataSource: SedeDataSource) {}

  getAll(): Promise<Sede[] | RespuestaGrap> {
    return this.sedeDataSource.getAll();
  }

  getById(id_sede: string): Promise<Sede | RespuestaGrap> {
    return this.sedeDataSource.getById(id_sede);
  }

  create(sede: Sede): Promise<RespuestaGrap> {
    return this.sedeDataSource.create(sede);
  }

  updateById(id_sede: string, sede: Sede): Promise<RespuestaGrap> {
    return this.sedeDataSource.updateById(id_sede, sede);
  }

  deleteById(id_sede: string): Promise<RespuestaGrap> {
    return this.sedeDataSource.deleteById(id_sede);
  }
}
