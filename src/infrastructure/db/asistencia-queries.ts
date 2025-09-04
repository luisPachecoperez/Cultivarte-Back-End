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
    updateAsistencia: `INSERT INTO asistencias (
                        id_asistencia,
                        id_sesion,
                        id_persona
                        ) 
                        VALUES ($1, $2, $3) RETURNING *`,

    deleteAsistencia: `DELETE FROM asistencias WHERE id_asistencia = $1 RETURNING *`,
    getSedes: `SELECT id_sede, nombre FROM sedes`,
        
    getAsistentesSesiones: `SELECT DISTINCT a.id_persona
                            FROM asistencias a
                            JOIN sesiones s ON s.id_sesion = a.id_sesion
                            WHERE a.id_actividad = $1
                            AND s.fecha_actividad <= CURRENT_DATE;`,
    getPreAsistencia: `SELECT * FROM asistencias WHERE id_persona = $1`,
    beneficiariosResult: `SELECT p.id_persona as id_persona,p.nombres || ' ' || p.apellidos nombre_completo, ps.id_sede
                        FROM personas p,
                            personas_grupo_interes pgi,
                            parametros_detalle pd, personas_sedes ps
                        WHERE p.id_persona = pgi.id_persona
                        AND pgi.id_grupo_interes = pd.id_parametro_detalle
                        AND p.id_persona = ps.id_persona
                        AND pd.nombre='BENEFICIARIO_CULTIVARTE';`,
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
                        id_sesion = $1,
                        id_actividad = $2, 
                        imagen = $3, 
                        nro_asistentes = $4,
                        descripcion = $5
                    WHERE id_sesion = $1 RETURNING *`,
    
    actividadSedesResult: `SELECT asi.*
                            FROM asistencias asi
                            JOIN sesiones s
                            ON asi.id_sesion = s.id_sesion
                            JOIN actividades a
                            ON s.id_actividad = a.id_actividad
                            WHERE s.fecha_actividad BETWEEN :fecha_inicio AND :fecha_fin
                            AND (
                                -- Caso 1: usuario tiene sedes → solo asistencias de esas sedes
                                EXISTS (
                                    SELECT 1
                                    FROM personas_sedes ps
                                    WHERE ps.id_persona = :idPersona
                                    AND ps.id_sede = a.id_sede
                                )
                                OR
                                -- Caso 2: usuario no tiene sedes → traer todas las asistencias
                                NOT EXISTS (
                                    SELECT 1
                                    FROM personas_sedes ps
                                    WHERE ps.id_persona = :idPersona
                                )
                            );`,
                            
    parametrosDetalleActividadResult: `SELECT * 
                                        FROM parametros_detalle pd
                                        WHERE pd.id_parametro_detalle = $1;`,

    actividadResult: `SELECT * FROM actividades WHERE id_actividad = $1;`,
}
