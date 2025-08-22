import { CalendarioFechaDataSource } from "../../domain/datasources/calendario-fecha-datasource";
import { CalendarioInput, Evento } from "../../domain/entities/calendario-fecha";
import { pgPool } from "../db/pg-pool";

export class CalendarioFechaDataSourceImpl implements CalendarioFechaDataSource {
    
    private pool = pgPool;
    
    async getByDate(calendarioInput: CalendarioInput): Promise<Evento[]> {
        const query = `
            SELECT 
                a.id_actividad     AS id_evento,
                s.id_sesion        AS id_sesion,
                a.nombre_actividad AS nombre_actividad,
                TO_CHAR(s.fecha_actividad + s.hora_inicio, 'YYYY-MM-DD HH24:MI:SS') AS desde,
                TO_CHAR(s.fecha_actividad + s.hora_fin,    'YYYY-MM-DD HH24:MI:SS') AS hasta,
                COUNT(asist.id_asistencia) AS asistentes_evento
            FROM sesiones s
            JOIN actividades a 
                ON s.id_actividad = a.id_actividad
            LEFT JOIN asistencias asist 
                ON asist.id_sesion = s.id_sesion
            WHERE s.fecha_actividad BETWEEN $1 AND $2
            GROUP BY a.id_actividad, s.id_sesion, a.nombre_actividad, s.fecha_actividad, s.hora_inicio, s.hora_fin
            ORDER BY s.fecha_actividad, s.hora_inicio;
        `;
        const result = await this.pool.query( query, [ calendarioInput.fecha_inicial, calendarioInput.fecha_final ] );
        return result.rows;
    }
}
