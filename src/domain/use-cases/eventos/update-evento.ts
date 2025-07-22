import {  EventoRepository,Evento } from "../../";

export interface UpdateEventoUseCase {
    execute( id_evento: string, evento: Evento ): Promise<Evento>;
}

export class UpdateEventoUseCaseImpl implements UpdateEventoUseCase {
    constructor(
        private readonly eventoRepository: EventoRepository
    ) {}

    execute( id_evento: string, evento: Evento ): Promise<Evento> {
        return this.eventoRepository.updateById( id_evento, evento );
    }
}