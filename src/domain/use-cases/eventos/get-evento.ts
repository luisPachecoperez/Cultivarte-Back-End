
import {  EventoRepository,Evento } from "../../";

export interface GetEventoUseCase {
    execute( id_evento: string ): Promise<Evento | null>;
}

export class GetEventoUseCaseImpl implements GetEventoUseCase {
    constructor(
        private readonly eventoRepository: EventoRepository
    ) {}

    execute( id_evento: string ): Promise<Evento | null> {
        return this.eventoRepository.getById( id_evento );
    }
}