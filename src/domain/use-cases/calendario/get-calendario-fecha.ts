import { CalendarioInput, Evento } from "../../entities/calendario-fecha";
import { CalendarioFechaRepository } from "../../repositories/calendario-fecha-repository";

export interface GetCalendarioFechaUseCase {
    execute( calendarioInput: CalendarioInput ): Promise<Evento[]>;
}

export class GetCalendarioFechaUseCaseImpl implements GetCalendarioFechaUseCase {
    constructor(
        private readonly calendarioFechaRepository: CalendarioFechaRepository
    ) {}

    execute( calendarioInput: CalendarioInput ): Promise<Evento[]> {
        return this.calendarioFechaRepository.getByDate( calendarioInput );
    }
}
