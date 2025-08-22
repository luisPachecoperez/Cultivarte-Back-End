import { CalendarioInput } from "../../domain/entities/calendario-fecha";
import { GetCalendarioFechaUseCase } from "../../domain/use-cases/calendario/get-calendario-fecha";

export class CalendarioFechaController {

    constructor(
        private readonly calendarioFechaUseCase: GetCalendarioFechaUseCase
    ) {}

    async getByDate( calendarioInput: CalendarioInput ): Promise<any> {
        return this.calendarioFechaUseCase.execute( calendarioInput );
    }
}