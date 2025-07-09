import { Evento } from "../../entities/evento";
import { EventoRepository } from "../../repositories/evento-repository";

export interface UpdateEventoUseCase {
    execute( evento: Evento ): Promise<Evento>;
}

export class UpdateEventoUseCaseImpl implements UpdateEventoUseCase {
    constructor(
        private readonly eventoRepository: EventoRepository
    ) {}

    execute( evento: Evento ): Promise<Evento> {
        return this.eventoRepository.updateById( evento );
    }
}