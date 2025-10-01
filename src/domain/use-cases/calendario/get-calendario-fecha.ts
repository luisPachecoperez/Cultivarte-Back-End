import {
  CalendarioInput,
  Evento,
  CalendarioFechaRepository,
  RespuestaGrap,
} from "../../";

export interface GetCalendarioFechaUseCase {
  execute(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap>;
}

export class GetCalendarioFechaUseCaseImpl
  implements GetCalendarioFechaUseCase
{
  constructor(
    private readonly calendarioFechaRepository: CalendarioFechaRepository,
  ) {}

  execute(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap> {
    return this.calendarioFechaRepository.getByDate(calendarioInput);
  }
}
