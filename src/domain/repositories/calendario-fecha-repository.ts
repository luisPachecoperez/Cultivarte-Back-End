import { CalendarioInput, Evento } from "../";

export interface CalendarioFechaRepository {
    getByDate( calendarioInput: CalendarioInput ): Promise<Evento[]>;
}