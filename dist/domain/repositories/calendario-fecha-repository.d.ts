import { CalendarioInput, Evento, RespuestaGrap } from '../';
export interface CalendarioFechaRepository {
    getByDate(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap>;
}
