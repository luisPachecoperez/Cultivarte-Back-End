import {
  GetCalendarioFechaUseCase,
  CalendarioInput,
  Evento,
  RespuestaGrap,
} from "../../domain";

export class CalendarioFechaController {
  constructor(
    private readonly calendarioFechaUseCase: GetCalendarioFechaUseCase,
  ) {}

  async getByDate(
    calendarioInput: CalendarioInput,
  ): Promise<Evento[] | RespuestaGrap> {
    return this.calendarioFechaUseCase.execute(calendarioInput);
  }
}
