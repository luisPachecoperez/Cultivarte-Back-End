import { AsistenciaDataSource,Asistencia, PreAsistencia, AsistenciaSesiones, RespuestaGrap } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { asistenciasQueries } from "../db/asistencia-queries";
import { sesionesQueries } from "../db/sesiones-queries";
import { actividadQueries } from "../db/actividad-queries";


export class AsistenciaDataSourceImpl implements AsistenciaDataSource {
    
    private pool = pgPool;
    
    async getAll(): Promise<Asistencia[] | RespuestaGrap> {
        try {
            const result = await this.pool.query( asistenciasQueries.asistenciasResult );
            return result.rows;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener actividades por sedes: ' + error
            };
        }
    }   
    
    async getById(id_asistencia: string): Promise<Asistencia | RespuestaGrap> {
        try {
            const result = await this.pool.query( asistenciasQueries.asistenciasResult, [id_asistencia] );
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener actividades por sedes: ' + error
            };
        }
    }       
    
    async getAsistenciasSede(id_usuario:string, fecha_inicio:string, fecha_fin:string): Promise<Asistencia[] | RespuestaGrap> {
       try {
        const result = await this.pool.query( asistenciasQueries.asistenciaSedesResult, [id_usuario, fecha_inicio, fecha_fin] );
        console.log("Resultados:", result.rows);
        return result.rows;
        
       } catch (error) {

        return {
            exitoso: "N",
            mensaje: 'No se pudo obtener actividades por sedes: ' + error
        };
       }
    }
    
    async createAsistencia(asistencia: Asistencia): Promise<RespuestaGrap> {
        try {       
            const result = await this.pool.query( asistenciasQueries.insertAsistencia, [
                                                asistencia.id_asistencia,  
                                                asistencia.id_sesion,   
                                                asistencia.id_persona, 
                                                asistencia.id_creado_por, 
                                                asistencia.fecha_creacion, 
                                                asistencia.id_modificado_por, 
                                                asistencia.fecha_modificacion] );
            return result.rows[0];
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener actividades por sedes: ' + error
            };       
        }
    }

    async updateAsistencias(asistenciaSesiones: AsistenciaSesiones): Promise<RespuestaGrap> {

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
            console.log("entro");
            for(let i = 0; i < asistenciaSesiones.nuevos.length; i++){
                await this.pool.query(asistenciasQueries.updateAsistencia, [
                    asistenciaSesiones.nuevos[i].id_asistencia,
                    asistenciaSesiones.nuevos[i].id_sesion,
                    asistenciaSesiones.nuevos[i].id_persona,
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
    
    
    async updateById(id_asistencia: string, asistencia: Asistencia): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query( asistenciasQueries.updateAsistencia, [   
                                                id_asistencia,
                                                asistencia.id_sesion,
                                                asistencia.id_persona,
                                                asistencia.id_modificado_por,
                                                asistencia.fecha_modificacion ] );
            return {
                exitoso: 'S',
                mensaje: 'Asistencia actualizada correctamente'
            };
        } catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar la asistencia'
            };
        }
    }
    
    async deleteById(id_asistencia: string): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query( asistenciasQueries.deleteAsistencia, [id_asistencia] );
            return {
                exitoso: 'S',
                mensaje: 'Asistencia eliminada correctamente'
            };
        } catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo eliminar la asistencia'
            };
        }
    }      
    
    async getPreAsistencia(id_sesion: string): Promise<PreAsistencia | RespuestaGrap> {
        try {
            console.log('id_sesion:', id_sesion);
            const sesionResult = await this.pool.query(sesionesQueries.getById, [id_sesion]);

            const sesion = sesionResult.rows[0];
            console.log('sesion object:', JSON.stringify(sesion, null, 2));
            
            if (!sesion) {
                return {
                    exitoso: 'N',
                    mensaje: 'Sesión no encontrada'
                };
            }

            // Derivar id_actividad desde la sesión para garantizar consistencia
            const actividadId = sesion.id_actividad;
            const actividadResult = await this.pool.query(asistenciasQueries.actividadResult, [actividadId]);
            const actividad = actividadResult.rows[0];
            
            if (!actividad) {
                return {
                    exitoso: 'N',
                    mensaje: 'No se encontró la actividad asociada a la sesión'
                };
            }
            
            // Ejecutar consultas independientes en paralelo
            try {
                const [sedes, beneficiarios, asistentes_sesiones] = await Promise.all([
                    this.pool.query(asistenciasQueries.getSedes),
                    this.pool.query(asistenciasQueries.beneficiariosResult),
                    this.pool.query(asistenciasQueries.getAsistentesSesiones, [id_sesion])
                ]);

                // Obtener parámetros de la actividad
                const parametrosResult = await this.pool.query(
                    asistenciasQueries.parametrosDetalleActividadResult, 
                    [actividad.id_tipo_actividad]
                );
                const parametro_actividad = parametrosResult.rows[0];
                
                const foto = (parametro_actividad?.nombre === "Actividad institucional" || 
                             parametro_actividad?.nombre === "Ludoteca viajera") ? "S" : "N";

                // Crear objeto de respuesta
                const preAsistencia: PreAsistencia = {
                    id_sesion: sesion.id_sesion,
                    id_sede: actividad.id_sede || '1', // Usar id_sede de la actividad o valor por defecto
                    numero_asistentes: parseInt(sesion.nro_asistentes) || 0,
                    foto: foto,
                    imagen: sesion.imagen || '',
                    sedes: sedes.rows || [],
                    beneficiarios: beneficiarios.rows || [],
                    asistentes_sesiones: asistentes_sesiones.rows || []
                };

                console.log('preAsistencia object:', JSON.stringify(preAsistencia, null, 2));
                return preAsistencia;
                
            } catch (error) {
                console.error('Error en consultas de pre-asistencia:', error);
                return {
                    exitoso: 'N',
                    mensaje: 'Error al obtener datos de pre-asistencia: ' + error
                };
            }
        } catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener la pre-asistencia'
            };
        }
    }
}