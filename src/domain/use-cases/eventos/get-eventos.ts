import { Evento } from "../../entities/evento";
import { EventoRepository } from "../../repositories/evento-repository";

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