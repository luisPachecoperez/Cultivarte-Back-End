import { CalendarioFechaRepository, CalendarioInput, Evento, CalendarioFechaDataSource, RespuestaGrap } from '../../domain';
export declare class CalendarioFechaRepositoryImpl implements CalendarioFechaRepository {
    private readonly calendarioFechaDataSource;
    constructor(calendarioFechaDataSource: CalendarioFechaDataSource);
    getByDate(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap>;
}
