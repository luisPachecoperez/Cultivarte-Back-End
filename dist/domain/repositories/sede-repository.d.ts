import { RespuestaGrap, Sede } from '../';
export interface SedeRepository {
    getAll(): Promise<Sede[] | RespuestaGrap>;
    getById(id_sede: string): Promise<Sede | RespuestaGrap>;
    create(sede: Sede): Promise<RespuestaGrap>;
    updateById(id_sede: string, sede: Sede): Promise<RespuestaGrap>;
    deleteById(id_sede: string): Promise<RespuestaGrap>;
}
