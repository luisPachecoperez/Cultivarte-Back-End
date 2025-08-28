import { CalendarioFechaDataSource,Evento,CalendarioInput } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { calendarioQueries } from "../db/calendario-queries";

export class CalendarioFechaDataSourceImpl implements CalendarioFechaDataSource {
    
    private pool = pgPool;
    
    async getByDate(calendarioInput: CalendarioInput): Promise<Evento[]> {
        const result = await this.pool.query( calendarioQueries.getByDate, [ calendarioInput.fecha_inicial, calendarioInput.fecha_final ] );
        return result.rows;
    }
}
