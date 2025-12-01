import { CalendarioInput, Evento, CalendarioFechaRepository, RespuestaGrap } from '../../';
export interface GetCalendarioFechaUseCase {
    execute(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap>;
}
export declare class GetCalendarioFechaUseCaseImpl implements GetCalendarioFechaUseCase {
    private readonly calendarioFechaRepository;
    constructor(calendarioFechaRepository: CalendarioFechaRepository);
    execute(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap>;
}
