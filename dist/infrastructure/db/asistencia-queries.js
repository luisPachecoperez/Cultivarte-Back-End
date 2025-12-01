"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asistenciasQueries = void 0;
exports.asistenciasQueries = {
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
    getAsistentesSesiones: `SELECT DISTINCT 
                            a.id_persona,
                            CASE 
                                WHEN s.id_sesion = $1
                                    AND EXISTS (
                                        SELECT 1 
                                        FROM asistencias ax 
                                        WHERE ax.id_sesion = $1
                                    )
                                THEN 'N'  -- Caso 1: la sesión sí tiene asistentes → no eliminar
                                ELSE 'S'  -- Caso 2: la sesión no tiene asistentes → marcar eliminar
                            END AS eliminar
                        FROM asistencias a
                        JOIN sesiones s ON a.id_sesion = s.id_sesion
                        WHERE 
                            (
                                -- Caso 1: si la sesión tiene asistentes, solo muestro esos
                                s.id_sesion = $1
                                AND EXISTS (
                                    SELECT 1 
                                    FROM asistencias ax 
                                    WHERE ax.id_sesion = $1
                                )
                            )
                            OR
                            (
                                -- Caso 2: si la sesión no tiene asistentes, muestro anteriores de la misma actividad
                                s.id_actividad = (
                                    SELECT act.id_actividad
                                    FROM actividades act
                                    JOIN sesiones s2 ON act.id_actividad = s2.id_actividad
                                    WHERE s2.id_sesion = $1
                                )
                                AND s.fecha_actividad <= CURRENT_DATE
                                AND NOT EXISTS (
                                    SELECT 1 
                                    FROM asistencias ax 
                                    WHERE ax.id_sesion = $1
                                )
                            );`,
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
                            WHERE s.id_actividad = $1;`,
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
    asistenciaSedesResult: `SELECT asi.*
                            FROM asistencias asi
                            JOIN sesiones s
                            ON asi.id_sesion = s.id_sesion
                            JOIN actividades a
                            ON s.id_actividad = a.id_actividad
                            WHERE s.fecha_actividad BETWEEN $2 AND $3
                            AND (
                                -- Caso 1: usuario tiene sedes → solo asistencias de esas sedes
                                EXISTS (
                                    SELECT 1
                                    FROM personas_sedes ps
                                    WHERE ps.id_persona = $1
                                    AND ps.id_sede = a.id_sede
                                )
                                OR
                                -- Caso 2: usuario no tiene sedes → traer todas las asistencias
                                NOT EXISTS (
                                    SELECT 1
                                    FROM personas_sedes ps
                                    WHERE ps.id_persona = $1
                                )
                            );`,
    parametrosDetalleActividadResult: `SELECT * 
                                        FROM parametros_detalle pd
                                        WHERE pd.id_parametro_detalle = $1;`,
    actividadResult: `SELECT * FROM actividades WHERE id_actividad = $1;`,
    updateAsistenciaById: `UPDATE asistencias SET 
                            id_sesion = $2, 
                            id_persona = $3, 
                            id_modificado_por = $4, 
                            fecha_modificacion = $5 
                            WHERE id_asistencia = $1 RETURNING *`,
};
//# sourceMappingURL=asistencia-queries.js.map