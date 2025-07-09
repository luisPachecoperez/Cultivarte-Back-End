import { Evento } from "../entities/evento";

export interface EventoDataSource {
    getAll(): Promise<Evento[]>;
    getById( id: string ): Promise<Evento | null>;
    create( evento: Evento ): Promise<Evento>;
    updateById( evento: Evento ): Promise<Evento>;
    delete( id: string ): Promise<boolean>; 
}
