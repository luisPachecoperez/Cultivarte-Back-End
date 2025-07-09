import { EventoRepository } from "../../repositories/evento-repository";

export interface DeleteEventoUseCase {
    execute( id: string ): Promise<boolean>;
}

export class DeleteEventoUseCaseImpl implements DeleteEventoUseCase {
    constructor(
        private readonly eventoRepository: EventoRepository
    ) {}

    execute( id: string ): Promise<boolean> {
        return this.eventoRepository.delete( id );
    }
}