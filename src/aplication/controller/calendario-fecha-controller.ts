
import { GetCalendarioFechaUseCase, CalendarioInput } from "../../domain";

export class CalendarioFechaController {

    constructor(
        private readonly calendarioFechaUseCase: GetCalendarioFechaUseCase
    ) {}

    async getByDate( calendarioInput: CalendarioInput ): Promise<any> {
        return this.calendarioFechaUseCase.execute( calendarioInput );
    }
}