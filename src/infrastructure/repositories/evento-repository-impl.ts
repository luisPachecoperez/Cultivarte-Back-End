import { EventoDataSource } from "../../domain";
import { Evento } from "../../domain";
import { EventoRepository } from "../../domain";

export class EventoRepositoryImpl implements EventoRepository {
    
    constructor(
        private readonly eventoDataSource: EventoDataSource
    ) {}

    getAll(): Promise<Evento[]> {
        return this.eventoDataSource.getAll();
    }

    getById( id_evento: string ): Promise<Evento | null> {
        return this.eventoDataSource.getById( id_evento );
    }

    create( evento: Evento ): Promise<Evento> {
        return this.eventoDataSource.create( evento );
    }

    updateById( id_evento: string, evento: Evento ): Promise<Evento> {
        return this.eventoDataSource.updateById( id_evento, evento );
    }

    deleteById( id_evento: string ): Promise<boolean> {
        return this.eventoDataSource.deleteById( id_evento );
    }
}
