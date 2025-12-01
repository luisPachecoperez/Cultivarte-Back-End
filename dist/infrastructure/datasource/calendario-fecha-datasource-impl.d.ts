import { CalendarioFechaDataSource, Evento, CalendarioInput, RespuestaGrap } from '../../domain';
export declare class CalendarioFechaDataSourceImpl implements CalendarioFechaDataSource {
    private readonly pool;
    getByDate(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap>;
}
