import {
  CalendarioFechaRepository,
  CalendarioInput,
  Evento,
  CalendarioFechaDataSource,
  RespuestaGrap,
} from '../../domain';

export class CalendarioFechaRepositoryImpl
  implements CalendarioFechaRepository
{
  constructor(
    private readonly calendarioFechaDataSource: CalendarioFechaDataSource,
  ) {}

  getByDate(
    calendarioInput: CalendarioInput,
  ): Promise<Evento[] | RespuestaGrap> {
    return this.calendarioFechaDataSource.getByDate(calendarioInput);
  }
}
