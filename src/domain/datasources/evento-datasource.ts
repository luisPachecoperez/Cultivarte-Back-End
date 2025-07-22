import { Evento } from "../";

export interface EventoDataSource {
    getAll(): Promise<Evento[]>;
    getById( id_evento: string ): Promise<Evento | null>;
    create( evento: Evento ): Promise<Evento>;
    updateById( id_evento: string, evento: Evento ): Promise<Evento>;
    deleteById( id_evento: string ): Promise<boolean>; 
}
