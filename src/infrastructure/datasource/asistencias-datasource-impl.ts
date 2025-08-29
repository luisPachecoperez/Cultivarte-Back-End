import { AsistenciaDataSource,Asistencia, PreAsistencia, AsistenciaSesiones, RespuestaGrap } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { asistenciasQueries } from "../db/asistencia-queries";
import { sesionesQueries } from "../db/sesiones-queries";


export class AsistenciaDataSourceImpl implements AsistenciaDataSource {
    
    private pool = pgPool;
    
    async getAll(): Promise<Asistencia[]> {
        const result = await this.pool.query( asistenciasQueries.asistenciasResult );
        return result.rows;
    }   
    
    async getById(id_asistencia: string): Promise<Asistencia | null> {
        const result = await this.pool.query( asistenciasQueries.asistenciasResult, [id_asistencia] );
        return result.rows[0] || null;
    }       
    
    async createAsistencia(asistencia: Asistencia): Promise<Asistencia> {
        const result = await this.pool.query( asistenciasQueries.insertAsistencia, [
                                             asistencia.id_asistencia, 
                                             asistencia.id_actividad, 
                                             asistencia.id_sesion,   
                                             asistencia.id_persona, 
                                             asistencia.id_creado_por, 
                                             asistencia.fecha_creacion, 
                                             asistencia.id_modificado_por, 
                                             asistencia.fecha_modificacion] );
        return result.rows[0];
    }

    async updateAsistencias(asistenciaSesiones: AsistenciaSesiones): Promise<RespuestaGrap> {

        console.log(asistenciaSesiones);
        if (asistenciaSesiones.nuevos === null || asistenciaSesiones.nuevos.length === 0) {

            await this.pool.query(asistenciasQueries.updateSesiones, [
                asistenciaSesiones.id_sesion,
                asistenciaSesiones.id_actividad,
                asistenciaSesiones.imagen,
                asistenciaSesiones.numero_asistentes,
                asistenciaSesiones.descripcion,   
          
            ]);
            return {
                exitoso: 'S',
                mensaje: 'Asistencia actualizada correctamente'
            };
        }else if (asistenciaSesiones.nuevos.length > 0){
            
            for(let i = 0; i < asistenciaSesiones.nuevos.length; i++){
                await this.pool.query(asistenciasQueries.updateAsistencia, [
                    asistenciaSesiones.id_asistencia,
                    asistenciaSesiones.id_actividad,
                    asistenciaSesiones.id_sesion,
                    asistenciaSesiones.nuevos[i].id_persona,
                    asistenciaSesiones.id_modificado_por,
                    asistenciaSesiones.fecha_modificacion
                ]);
            }
            return {
                exitoso: 'S',
                mensaje: 'Asistencia actualizada correctamente'
            };
        }else{
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar la asistencia'
            };
        }
    }
    
    
    async updateById(id_asistencia: string, asistencia: Asistencia): Promise<Asistencia> {
        const result = await this.pool.query( asistenciasQueries.updateAsistencia, [   
                                                id_asistencia,
                                                asistencia.id_actividad,
                                                asistencia.id_sesion,
                                                asistencia.id_persona,
                                                asistencia.id_modificado_por,
                                                asistencia.fecha_modificacion ] );
        return result.rows[0];
    }
    
    async deleteById(id_asistencia: string): Promise<boolean> {
        const result = await this.pool.query( asistenciasQueries.deleteAsistencia, [id_asistencia] );
        return true;
    }      
    
    async getPreAsistencia(id_sesion: string): Promise<PreAsistencia> {
        const sesionResult = await this.pool.query(sesionesQueries.getById, [id_sesion]);
        const sesion = sesionResult.rows[0];
        if (!sesion) {
            throw new Error(`Sesión no encontrada: ${id_sesion}`);
        }

        // Derivar id_actividad desde la sesión para garantizar consistencia
        const actividadId = sesion.id_actividad;

        // Ejecutar consultas independientes en paralelo
        const [sedes, beneficiarios, asistentes_sesiones, numero_asistentes] = await Promise.all([
            this.pool.query(asistenciasQueries.getSedes),
            this.pool.query(asistenciasQueries.beneficiariosResult),
            this.pool.query(asistenciasQueries.getAsistentesSesiones, [actividadId]),
            this.pool.query(asistenciasQueries.numeroAsistentesResult, [actividadId]),
        ]);

        const cantidad = numero_asistentes?.rows?.[0]?.cantidad_asistentes ?? 0;

        return {
            id_actividad: actividadId,
            id_sesion: sesion.id_sesion,
            // Si el esquema de sesiones no tiene id_sede, devolvemos vacío hasta ajustar la query de origen
            id_sede: (sesion as any).id_sede ?? '',
            numero_asistentes: sesion.nro_asistentes,
            // Usar imagen como fallback para foto si no existe la columna foto
            foto: (sesion as any).foto ?? sesion.imagen ?? '',
            imagen: sesion.imagen ?? '',
            sedes: sedes.rows,
            beneficiarios: beneficiarios.rows,
            asistentes_sesiones: asistentes_sesiones.rows,
        };
    }
}
