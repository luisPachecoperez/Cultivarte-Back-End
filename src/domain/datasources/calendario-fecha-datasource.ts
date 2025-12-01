import { CalendarioInput, Evento, RespuestaGrap } from '../';

export interface CalendarioFechaDataSource {
  getByDate(
    calendarioInput: CalendarioInput,
  ): Promise<Evento[] | RespuestaGrap>;
}
