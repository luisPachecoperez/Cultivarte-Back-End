import { Item, PreCreateActividad, ActividadDataSource } from "../../domain";
import { pgPool } from "../db/pg-pool";

import { RespuestaEventos } from "../../domain/entities/pre-create-actividad";
import { NombreEventos } from "../../domain/entities/pre-create-actividad";
import { Actividad } from "../../domain/entities/actividad";

export class ActividadDataSourceImpl implements ActividadDataSource {

    private pool = pgPool;
    private id_programa: string = "";
    private sedes: Item[] = [];
    private tiposDeEvento: Item[] = [];
    private aliados: Item[] = [];
    private responsables: Item[] = [];
    private nombreDeEventos: string = "";
    private frecuencias: Item[] = [];
    
    async getPreCreateActividadData( id_usuario: string ): Promise<PreCreateActividad> {
      
        
      const programaRes = await this.pool.query( `SELECT pp.id_programa
                                                    FROM personas_programas pp
                                                    WHERE pp.id_persona = $1
                                                    LIMIT 1`, [id_usuario] );
        this.id_programa = programaRes.rows[0];
   

        const sedesResult = await this.pool.query( `SELECT s.id_sede as id, s.nombre
                FROM personas_sedes ps
                JOIN sedes s ON ps.id_sede = s.id_sede
                WHERE ps.id_persona = $1`, [id_usuario] );

        this.sedes = sedesResult.rows;

        if (this.sedes.length === 0) {
            const allSedesResult = await this.pool.query( `SELECT id_sede as id, nombre
                FROM sedes` );
            this.sedes = allSedesResult.rows;
        }
        
        const tiposDeEventoResult = await this.pool.query( `
                SELECT 
                    pd.id_parametro_detalle as id,
                    pd.nombre
                FROM parametros_detalle pd 
                INNER JOIN parametros_generales pg 
                ON pd.id_parametro_general = pg.id_parametro_general
                WHERE pg.nombre_parametro = 'TIPO_EVENTO';` );

        this.tiposDeEvento = tiposDeEventoResult.rows;

        const aliadosResult = await this.pool.query( `
            SELECT p.id_persona as id,p.nombres || p.apellidos nombre
            FROM personas p,
                personas_grupo_interes pgi,
                parametros_detalle pd
            WHERE p.id_persona = pgi.id_persona
            AND pgi.id_grupo_interes = pd.id_parametro_detalle
            AND pd.nombre='ALIADO_CULTIVARTE';`);

        this.aliados = aliadosResult.rows;

        const responsablesResult = await this.pool.query( `SELECT pd.id_parametro_detalle as id, pd.nombre
                FROM parametros_detalle pd
                WHERE pd.id_parametro_general = $1` );
        this.responsables = responsablesResult.rows;    


        const nombreDeEventosResult = await this.pool.query( `
                SELECT pd.id_parametro_detalle, pd.nombre, pd.valores
                    FROM parametros_detalle pd
                INNER JOIN parametros_generales pg 
                ON pd.id_parametro_general = pg.id_parametro_general
                WHERE pg.nombre_parametro = 'NOMBRE_EVENTO'` );
        const nombreEventos = nombreDeEventosResult.rows;   
      
        const eventos: RespuestaEventos = {
            NOMBRE_EVENTOS: {
            LISTADO_CONTENIDO: [],
            ACTIVIDAD_GENERAL: [],
            },
        };

        for (const row of nombreEventos) {
            const id = row.id_parametro_detalle;
            const tipo = row.nombre as keyof NombreEventos; // "LISTADO_CONTENIDO" | "ACTIVIDAD_GENERAL"
            const valores = row.valores.split(",");

            eventos.NOMBRE_EVENTOS[tipo] = valores.map((v: string) => ({
                id,
                Nombre: v.trim(),
            }));
        }


        const frecuenciasResult = await this.pool.query( `
            SELECT pd.id_parametro_detalle id,
                pd.nombre
            FROM parametros_detalle pd 
            INNER JOIN parametros_generales pg 
            ON pd.id_parametro_general = pg.id_parametro_general
            WHERE pg.nombre_parametro = 'FRECUENCIAS';` );

        this.frecuencias = frecuenciasResult.rows;    

        const preCreateEventData: PreCreateActividad = {
            id_programa: this.id_programa,
            sedes: this.sedes,
            tiposDeEvento: this.tiposDeEvento,
            aliados: this.aliados,
            responsables: this.responsables,
            nombreDeEventos: [eventos.NOMBRE_EVENTOS],
            frecuencias: this.frecuencias
        };
        
        return preCreateEventData;
    }

    async getAll(): Promise<Actividad[]> {
        const result = await this.pool.query( `SELECT * FROM actividades` );
        return result.rows;
    }   

    async getById(id_actividad: string): Promise<Actividad | null> {
        const result = await this.pool.query( `SELECT * FROM actividades WHERE id_actividad = $1`, [id_actividad] );
        return result.rows[0] || null;
    }

    async create(actividad: Actividad): Promise<Actividad> {
        const result = await this.pool.query( `INSERT INTO actividades (id_actividad, id_programa, id_tipo_actividad, id_responsable, id_aliado, id_sede, id_frecuencia, institucional, nombre_actividad, descripcion, fecha_actividad_desde, fecha_actividad_hasta, plazo_asistencia, estado, id_creado_por, fecha_creacion, id_modificado_por, fecha_modificacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)` );
        return result.rows[0];
    }

    async updateById(id_actividad: string, actividad: Actividad): Promise<Actividad> {
        const result = await this.pool.query( `UPDATE actividades SET id_programa = $2, id_tipo_actividad = $3, id_responsable = $4, id_aliado = $5, id_sede = $6, id_frecuencia = $7, institucional = $8, nombre_actividad = $9, descripcion = $10, fecha_actividad_desde = $11, fecha_actividad_hasta = $12, plazo_asistencia = $13, estado = $14, id_creado_por = $15, fecha_creacion = $16, id_modificado_por = $17, fecha_modificacion = $18 WHERE id_actividad = $1` );
        return result.rows[0];
    }

    async deleteById(id_actividad: string): Promise<boolean> {
        const result = await this.pool.query( `DELETE FROM actividades WHERE id_actividad = $1`, [id_actividad] );
        return true;
    }           
}
