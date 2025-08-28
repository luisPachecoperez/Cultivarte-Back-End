import { CalendarioFechaRepository, 
         CalendarioInput,
         Evento,
         CalendarioFechaDataSource } from "../../domain";

export class CalendarioFechaRepositoryImpl implements CalendarioFechaRepository {

    constructor(
        private readonly calendarioFechaDataSource: CalendarioFechaDataSource
    ) {}

    getByDate( calendarioInput: CalendarioInput ): Promise<Evento[]> {
        return this.calendarioFechaDataSource.getByDate( calendarioInput );
    }
}   