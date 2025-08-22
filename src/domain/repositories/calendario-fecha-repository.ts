import { CalendarioInput, Evento } from "../entities/calendario-fecha";

export interface CalendarioFechaRepository {
    getByDate(calendarioInput: CalendarioInput): Promise<Evento[]>;
}