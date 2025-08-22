import { CalendarioFechaRepository } from "../../domain/repositories/calendario-fecha-repository";
import { CalendarioInput, Evento } from "../../domain/entities/calendario-fecha";
import { CalendarioFechaDataSource } from "../../domain/datasources/calendario-fecha-datasource";

export class CalendarioFechaRepositoryImpl implements CalendarioFechaRepository {

    constructor(
        private readonly calendarioFechaDataSource: CalendarioFechaDataSource
    ) {}

    getByDate( calendarioInput: CalendarioInput ): Promise<Evento[]> {
        return this.calendarioFechaDataSource.getByDate( calendarioInput );
    }
}   