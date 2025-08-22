import { CalendarioInput, Evento } from "../entities/calendario-fecha";

export interface CalendarioFechaDataSource {
    getByDate(calendarioInput: CalendarioInput): Promise<Evento[]>;
}