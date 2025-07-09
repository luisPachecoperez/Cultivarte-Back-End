import { Evento } from "../../entities/evento";
import { EventoRepository } from "../../repositories/evento-repository";

export interface GetEventoUseCase {
    execute( id: string ): Promise<Evento | null>;
}

export class GetEventoUseCaseImpl implements GetEventoUseCase {
    constructor(
        private readonly eventoRepository: EventoRepository
    ) {}

    execute( id: string ): Promise<Evento | null> {
        return this.eventoRepository.getById( id );
    }
}