
import {  EventoRepository,Evento } from "../../";

export interface GetEventosUseCase {
    execute(): Promise<Evento[]>;
}

export class GetEventosUseCaseImpl implements GetEventosUseCase {
    constructor(
        private readonly eventoRepository: EventoRepository
    ) {}

    execute(): Promise<Evento[]> {
        return this.eventoRepository.getAll();
    }
}