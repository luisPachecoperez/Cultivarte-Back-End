import { SedeRepository } from '../../domain/repositories/sede-repository';
import { SedeDataSource } from '../../domain/datasources/sede-datasource';
import { RespuestaGrap } from '../../domain/entities/respuesta';
import { Sede } from '../../domain/entities/sede';
export declare class SedeRepositoryImpl implements SedeRepository {
    private readonly sedeDataSource;
    constructor(sedeDataSource: SedeDataSource);
    getAll(): Promise<Sede[] | RespuestaGrap>;
    getById(id_sede: string): Promise<Sede | RespuestaGrap>;
    create(sede: Sede): Promise<RespuestaGrap>;
    updateById(id_sede: string, sede: Sede): Promise<RespuestaGrap>;
    deleteById(id_sede: string): Promise<RespuestaGrap>;
}
