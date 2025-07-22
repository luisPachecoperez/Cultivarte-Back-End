import { Evento, EventoRepository } from "../../";

export interface CreateEventoUseCase {
    execute( evento: Evento ): Promise<Evento>;
}

export class CreateEventoUseCaseImpl implements CreateEventoUseCase {
    constructor(
        private readonly eventoRepository: EventoRepository
    ) {}

    execute( evento: Evento ): Promise<Evento> {
        return this.eventoRepository.create( evento );
    }
}
