import { GetCalendarioFechaUseCase, CalendarioInput, Evento, RespuestaGrap } from '../../domain';
export declare class CalendarioFechaController {
    private readonly calendarioFechaUseCase;
    constructor(calendarioFechaUseCase: GetCalendarioFechaUseCase);
    getByDate(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap>;
}
