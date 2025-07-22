
import {  EventoRepository } from "../../";

export interface DeleteEventoUseCase {
    execute( id_evento: string ): Promise<boolean>;
}

export class DeleteEventoUseCaseImpl implements DeleteEventoUseCase {
    constructor(
        private readonly eventoRepository: EventoRepository
    ) {}

    execute( id_evento: string ): Promise<boolean> {
        return this.eventoRepository.deleteById( id_evento );
    }
}   