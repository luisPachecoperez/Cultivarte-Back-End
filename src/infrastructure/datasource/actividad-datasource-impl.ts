import { Item, PreCreateActividad, ActividadDataSource, RespuestaGrap, Sesion } from "../../domain";
import { SedeItem, FrecuenciaItem, NombresActividad, TipoActividadItem, AliadoItem, ResponsableItem } from "../../domain/entities/pre-create-actividad";
import { pgPool } from "../db/pg-pool";
import { Actividad } from "../../domain/entities/actividad";
import { actividadQueries } from "../db/actividad-queries";
import { randomUUID } from 'crypto';
import { PreEditActividad } from "../../domain/entities/pre-edit-actividad";

export class ActividadDataSourceImpl implements ActividadDataSource {

    private pool = pgPool;

    async getPreCreateActividad(id_usuario: string): Promise<PreCreateActividad | RespuestaGrap> {
        const client = await this.pool.connect();
        try {
            // Execute parallel queries using the same client for better connection management
            const [
                programaRes,
                sedesRes,
                tiposDeActividadRes,
                aliadosRes,
                responsablesRes,
                nombreDeActividadRes,
                frecuenciasRes,
            ] = await Promise.all([
                client.query(actividadQueries.programaRes, [id_usuario]),
                client.query(actividadQueries.sedesResult, [id_usuario]),
                client.query(actividadQueries.tiposDeActividadResult),
                client.query(actividadQueries.aliadosResult),
                client.query(actividadQueries.responsablesResult),
                client.query(actividadQueries.nombreDeActividadResult),
                client.query(actividadQueries.frecuenciasResult),
            ]);

            // id_programa seguro
            const id_programa: string = programaRes.rows?.[0]?.id_programa ?? "";

            // Sedes con fallback a todas las sedes si no tiene asignadas
            let sedes: SedeItem[] = sedesRes.rows ?? [];
            if (sedes.length === 0) {
                const allSedesResult = await client.query(actividadQueries.allSedesResult);
                sedes = allSedesResult.rows ?? [];
            }

            const tiposDeActividad: TipoActividadItem[] = tiposDeActividadRes.rows ?? [];
            const aliados: AliadoItem[] = aliadosRes.rows ?? [];
            const responsables: ResponsableItem[] = responsablesRes.rows ?? [];

            // Construcción de nombreDeActividad respetando la interfaz NombreActividad { id_tipo_actividad, nombre }
            const nombreEventosRows = nombreDeActividadRes.rows ?? [];
            const nombresDeActividad: NombresActividad[] = [];

            for (const row of nombreEventosRows) {
                // Asegurar un id válido; si no existe, saltar la fila
                const id_tipo_actividad = row?.id_tipo_actividad;
                const nombreBase = row?.nombre;

                if (!id_tipo_actividad || !nombreBase) continue;

                // Si hay valores con nombres separados por comas, expandirlos
                let valores: string[] = [];
                
                try {
                    if (row?.valores) {
                        const valores = row.valores.split(',').map((v: string) => v.trim());
                        for (const nombre of valores) {
                            if (!nombre) continue;
                            nombresDeActividad.push({ id_tipo_actividad, nombre });
                        }
                        
                    }
                } catch { /* ignore malformed JSON */
                    nombresDeActividad.push({ id_tipo_actividad: '', nombre: '' });
                }
            }

            const frecuencias: FrecuenciaItem[] = frecuenciasRes.rows ?? [];

            const preCreateEventData: PreCreateActividad = {
                id_programa,
                sedes,
                tiposDeActividad,
                aliados,
                responsables,
                nombresDeActividad,
                frecuencias,
            };

            return preCreateEventData;
        } catch (error) {
            console.error('Error in getPreCreateActividad:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    async getPreEditActividad( id_actividad: string, id_usuario: string ): Promise<PreEditActividad | RespuestaGrap> {
        try {
            // Ejecutar consultas independientes en paralelo
            const [
                programaRes,
                sedesRes,
                tiposDeActividadRes,
                aliadosRes,
                responsablesRes,
                nombreDeActividadRes,
                frecuenciasRes,
                actividadRes,
                sesionesRes
            ] = await Promise.all([
                this.pool.query(actividadQueries.programaRes, [id_usuario]),
                this.pool.query(actividadQueries.sedesResult, [id_usuario]),
                this.pool.query(actividadQueries.tiposDeActividadResult),
                this.pool.query(actividadQueries.aliadosResult),
                this.pool.query(actividadQueries.responsablesResult),
                this.pool.query(actividadQueries.nombreDeActividadResult),
                this.pool.query(actividadQueries.frecuenciasResult),
                this.pool.query(actividadQueries.actividadResult, [id_actividad]),
                this.pool.query(actividadQueries.sesionesResult, [id_actividad])
            ]);
        
            // id_programa validation
            const id_programa: string = programaRes.rows?.[0]?.id_programa ?? "";
            console.log( 'id_programa', id_programa);
            if (!id_programa) {
                return {
                    exitoso: "N",
                    mensaje: 'No se pudo determinar el programa para el usuario.'
                };
            }

            // Sedes con fallback a todas las sedes si no tiene asignadas
            let sedes: SedeItem[] = sedesRes.rows ?? [];
            if (sedes.length === 0) {
                const allSedesResult = await this.pool.query(actividadQueries.allSedesResult);
                sedes = allSedesResult.rows ?? [];
            }

            const tiposDeActividad: TipoActividadItem[] = tiposDeActividadRes.rows ?? [];
            const aliados: AliadoItem[] = aliadosRes.rows ?? [];
            const responsables: ResponsableItem[] = responsablesRes.rows ?? [];

            // Get actividad and validate it exists
            const actividad: Actividad | undefined = actividadRes.rows?.[0];
            
            if (!actividad) {
                console.error('No se encontró la actividad con ID:', id_actividad);
                return {
                    exitoso: "N",
                    mensaje: 'No se encontró la actividad con el ID proporcionado.'
                };
            }
            
            const sesiones: Sesion[] = sesionesRes.rows ?? [];
            // Construcción de nombreDeActividad respetando la interfaz NombreActividad { id_tipo_actividad, nombre }
            const nombreEventosRows = nombreDeActividadRes.rows ?? [];
            const nombresDeActividad: NombresActividad[] = [];

            for (const row of nombreEventosRows) {
                // Asegurar un id válido; si no existe, saltar la fila
                const id_tipo_actividad = row?.id_tipo_actividad;
                const nombreBase = row?.nombre;

                if (!id_tipo_actividad || !nombreBase) continue;

                // Si hay valores con nombres separados por comas, expandirlos
                let valores: string[] = [];
                
                try {
                    if (row?.valores) {
                        const valores = row.valores.split(',').map((v: string) => v.trim());
                        for (const nombre of valores) {
                            if (!nombre) continue;
                            nombresDeActividad.push({ id_tipo_actividad, nombre });
                        }
                        
                    }
                } catch { /* ignore malformed JSON */
                    nombresDeActividad.push({ id_tipo_actividad: '', nombre: '' });
                }
            }
            const frecuencias: FrecuenciaItem[] = frecuenciasRes.rows ?? [];
            const preEditEventData: PreEditActividad = {
                id_programa,
                sedes,
                tiposDeActividad,
                aliados,
                responsables,
                nombresDeActividad,
                frecuencias,
                actividad,
                sesiones
            };

            return preEditEventData;
        } catch (error) {
        // Dejar que la capa superior maneje el error con su propio logger
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener actividades por sedes: ' + error
            };
        }
    }

    async getAll(): Promise<Actividad[] | RespuestaGrap> {
        try {
            const result = await this.pool.query( actividadQueries.actividadesResult );
            return result.rows;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener actividades: ' + error
            };
        }
    }   

    async getById(id_actividad: string): Promise<Actividad | RespuestaGrap> {
        try {
            const result = await this.pool.query( actividadQueries.actividadResult, [id_actividad] );
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener actividad: ' + error
            };
        }
    }

    async getActividadSedes( id_usuario:string, fecha_inicio:string, fecha_fin:string ): Promise<Actividad[] | RespuestaGrap> {
       try {
        const result = await this.pool.query( 
            actividadQueries.actividadSedesResult, 
            [fecha_inicio, fecha_fin, id_usuario] 
        );
        return result.rows;
        
       } catch (error) {
        return {
            exitoso: "N",
            mensaje: 'No se pudo obtener actividades por sedes: ' + error
        };
       }
    }
    
    async createActividadAndSesiones(actividad: Actividad): Promise<Actividad | RespuestaGrap> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            // Generar ID de actividad si no viene
            const actividadId = actividad.id_actividad || randomUUID();
            // 1. Insertar la actividad
            const result = await client.query(actividadQueries.insertActividad, [
                actividadId, 
                actividad.id_programa, 
                actividad.id_tipo_actividad, 
                actividad.id_responsable, 
                actividad.id_aliado, 
                actividad.id_sede, 
                actividad.id_frecuencia, 
                actividad.institucional, 
                actividad.nombre_actividad, 
                actividad.descripcion, 
                actividad.fecha_actividad, 
                actividad.hora_inicio,
                actividad.hora_fin,
                actividad.plazo_asistencia, 
                actividad.estado, 
                actividad.id_creado_por, 
                actividad.fecha_creacion, 
                actividad.id_modificado_por, 
                actividad.fecha_modificacion
            ]);
    
            if (result.rows.length > 0 && actividad.fecha_actividad && actividad.fecha_actividad) {
                // 2. Generar sesiones según la frecuencia
                const sesiones = this.generarSesiones(
                    actividadId,
                    actividad.fecha_actividad,
                    actividad.frecuencia || '',
                    actividad.id_creado_por || '',
                    actividad.hora_inicio || '09:00:00',
                    actividad.hora_fin || '12:00:00'
                );
    
                // 3. Insertar las sesiones generadas
                for (const sesion of sesiones) {
                    await client.query(
                        actividadQueries.insertSesion,
                        [
                            sesion.id_sesion,
                            actividadId,
                            sesion.fecha_actividad,
                            sesion.hora_inicio || '09:00:00',
                            sesion.hora_fin || '12:00:00',
                            sesion.id_creado_por,
                            new Date(),
                            sesion.id_creado_por,
                            new Date()
                        ]
                    );
                }
            }
    
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            return {
                exitoso: "N",
                mensaje: 'No se pudo crear actividad: ' + error
            };
        } finally {
            client.release();
        }
    }
    
    async createActividad(actividad: Actividad): Promise<RespuestaGrap> {
      
        try {
            const actividadId = actividad.id_actividad || randomUUID();
            const result = await this.pool.query( actividadQueries.insertActividad, [
                actividadId, 
                actividad.id_programa, 
                actividad.id_tipo_actividad, 
                actividad.id_responsable, 
                actividad.id_aliado, 
                actividad.id_sede, 
                actividad.id_frecuencia, 
                actividad.institucional, 
                actividad.nombre_actividad, 
                actividad.descripcion, 
                actividad.fecha_actividad, 
                actividad.hora_inicio,
                actividad.hora_fin,
                actividad.plazo_asistencia, 
                actividad.estado, 
                actividad.id_creado_por, 
                actividad.fecha_creacion, 
                actividad.id_modificado_por, 
                actividad.fecha_modificacion
            ]);
       
            return { exitoso: 'S', mensaje: 'Actividad creada exitosamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al crear actividad: ' + error };
        }
    }

    async updateById(id_actividad: string, actividad: Actividad): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query( actividadQueries.updateActividad, [   
                                                    id_actividad,
                                                    actividad.id_programa,
                                                    actividad.id_tipo_actividad,
                                                    actividad.id_responsable,
                                                    actividad.id_aliado,
                                                    actividad.id_sede,
                                                    actividad.id_frecuencia,
                                                    actividad.institucional,
                                                    actividad.nombre_actividad,
                                                    actividad.descripcion,
                                                    actividad.fecha_actividad,
                                                    actividad.hora_inicio,
                                                    actividad.hora_fin,
                                                    actividad.plazo_asistencia,
                                                    actividad.estado,
                                                    actividad.id_creado_por,
                                                    actividad.fecha_creacion,
                                                    actividad.id_modificado_por,
                                                    actividad.fecha_modificacion ] );
            return { exitoso: 'S', mensaje: 'Actividad actualizada exitosamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al actualizar actividad: ' + error };
        }
    }

    async deleteById(id_actividad: string): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query( actividadQueries.deleteActividad, [id_actividad] );
            return { exitoso: 'S', mensaje: 'Actividad eliminada exitosamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al eliminar actividad: ' + error };
        }
    }   
    
    /**Metodos propios de la clase auxiliares para los de contrato */
    private generarSesiones(
        idActividad: string,
        fechaActividad: Date,
        frecuencia: string,
        idCreadoPor: string = '',
        hora_inicio: string = '09:00:00',
        hora_fin: string = '12:00:00'
    ): Array<{ id_sesion: string;
                 id_actividad: string;
                 fecha_actividad: Date;
                 hora_inicio: string;
                 hora_fin: string;
                 id_creado_por: string }>
    {
        const sesiones: Array<{ id_sesion: string;
                                id_actividad: string;
                                fecha_actividad: Date;
                                hora_inicio: string;
                                hora_fin: string;
                                id_creado_por: string }> = [];
        const fechaActual = new Date(fechaActividad);
        
        // Si no hay frecuencia definida, crear solo una sesión en la fecha de inicio
        if (!frecuencia) {
            sesiones.push({
                id_sesion: randomUUID(),
                id_actividad: idActividad,
                fecha_actividad: new Date(fechaActividad),
                hora_inicio,
                hora_fin,
                id_creado_por: idCreadoPor
            });
            return sesiones;
        }

        //Obtener la fecha fin
        const year = fechaActividad.getFullYear();
        const month = fechaActividad.getMonth();
        const fechaFin = new Date(year, month + 1, 0);
    
        // Generar sesiones según la frecuencia
        while (fechaActual <= fechaFin ) {
            // Verificar si es día laboral (lunes a sábado)
            const diaSemana = fechaActual.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado
            
            if (diaSemana >= 1 && diaSemana <= 6) { // Lunes a sábado
                sesiones.push({
                    id_sesion: randomUUID(),
                    id_actividad: idActividad,
                    fecha_actividad: new Date(fechaActual),
                    hora_inicio,
                    hora_fin,
                    id_creado_por: idCreadoPor
                });
            }
    
            // Avanzar según la frecuencia
            if (frecuencia === 'Diario') {
                fechaActual.setDate(fechaActual.getDate() + 1);
            } else if (frecuencia === 'Semanal') {
                fechaActual.setDate(fechaActual.getDate() + 7);
            } else if (frecuencia === 'Mensual') {
                fechaActual.setMonth(fechaActual.getMonth() + 1);
            } else {
                break; // Frecuencia no reconocida
            }   
        }
        
        return sesiones;
    }
}
