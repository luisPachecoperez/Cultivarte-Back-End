import { EventoDataSource } from "../../domain/datasources/evento-datasource";
import { Evento } from "../../domain/entities/evento";
import { EventoRepository } from "../../domain/repositories/evento-repository";

export class EventoRepositoryImpl implements EventoRepository {
    
    constructor(
        private readonly eventoDataSource: EventoDataSource
    ) {}

    getAll(): Promise<Evento[]> {
        return this.eventoDataSource.getAll();
    }

    getById( id: string ): Promise<Evento | null> {
        return this.eventoDataSource.getById( id );
    }

    create( evento: Evento ): Promise<Evento> {
        return this.eventoDataSource.create ( evento );
    }

    updateById( evento: Evento ): Promise<Evento> {
        return this.eventoDataSource.updateById ( evento );
    }

    delete( id: string ): Promise<boolean> {
        return this.eventoDataSource.delete( id );
    }
}
