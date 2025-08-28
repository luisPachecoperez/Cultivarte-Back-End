import { CalendarioInput, Evento } from "../";

export interface CalendarioFechaDataSource {
    getByDate(calendarioInput: CalendarioInput): Promise<Evento[]>;
}