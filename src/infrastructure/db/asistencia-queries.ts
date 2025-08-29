export const asistenciasQueries = {
    
    asistenciasResult: `SELECT * FROM asistencias`,
    insertAsistencia: `INSERT INTO asistencias (
                        id_asistencia,
                        id_actividad,
                        id_sesion,
                        id_persona,
                        id_creado_por,
                        fecha_creacion,
                        id_modificado_por,
                        fecha_modificacion) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    updateAsistencia: `UPDATE asistencias SET 
                        id_actividad = $2, 
                        id_sesion = $3, 
                        id_persona = $4, 
                        id_modificado_por = $5, 
                        fecha_modificacion = $6 
                        WHERE id_asistencia = $1 RETURNING *`,
    deleteAsistencia: `DELETE FROM asistencias WHERE id_asistencia = $1 RETURNING *`,
    getSedes: `SELECT id_sede, nombre FROM sedes`,
        
    getAsistentesSesiones: `SELECT DISTINCT a.id_persona
                            FROM asistencias a
                            JOIN sesiones s ON s.id_sesion = a.id_sesion
                            WHERE a.id_actividad = $1
                            AND s.fecha_actividad <= CURRENT_DATE;`,
    getPreAsistencia: `SELECT * FROM asistencias WHERE id_persona = $1`,
    beneficiariosResult: `SELECT 
                                pd.id_parametro_detalle AS id_persona,
                                pd.nombre AS nombre_completo,
                                ''::text AS id_sede
                                FROM parametros_detalle pd
                                INNER JOIN parametros_generales pg
                                ON pd.id_parametro_general = pg.id_parametro_general
                                WHERE pg.nombre_parametro = 'BENEFICIARIOS_CULTIVARTE';`,
    numeroAsistentesResult: `SELECT COUNT(DISTINCT a.id_persona) AS cantidad_asistentes
                            FROM asistencias a
                            JOIN sesiones s ON s.id_sesion = a.id_sesion
                            WHERE a.id_actividad = $1;`,

    insertSesiones: `INSERT INTO sesiones (
                        id_sesion,
                        id_actividad,
                        id_persona,
                        id_creado_por,
                        fecha_creacion,
                        id_modificado_por,
                        fecha_modificacion) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                        
    updateSesiones: `UPDATE sesiones SET 
                        id_actividad = $2, 
                        imagen = $3, 
                        nro_asistentes = $4 
                        descripcion = $5,
                        WHERE id_sesion = $1 RETURNING *`,
}
