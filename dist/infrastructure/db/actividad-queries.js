"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actividadQueries = void 0;
exports.actividadQueries = {
    programaRes: `SELECT pp.id_programa
                    FROM 
                        personas_programas pp,
                        parametros_generales pg,
                        parametros_detalle pd
                    WHERE 
                        pg.id_parametro_general=pd.id_parametro_general
                        and pd.id_parametro_detalle=pp.id_programa
                        and upper(pg.nombre_parametro)  like 'PROGRAMA'
                        and upper(pd.nombre) ='CULTIVARTE'
                        and pp.id_persona =  $1`,
    sedesResult: `SELECT s.id_sede as id_sede, 
                         s.nombre
                    FROM personas_sedes ps
                    JOIN sedes s ON ps.id_sede = s.id_sede
                    WHERE ps.id_persona = $1`,
    allSedesResult: `SELECT id_sede as id_sede, 
                        nombre
                        FROM sedes;`,
    tiposDeActividadResult: `SELECT 
                            pd.id_parametro_detalle as id_tipo_actividad,
                            pd.nombre
                        FROM parametros_detalle pd 
                        INNER JOIN parametros_generales pg 
                        ON pd.id_parametro_general = pg.id_parametro_general
                        WHERE pg.nombre_parametro = 'TIPO_ACTIVIDAD_CULTIVARTE';`,
    aliadosResult: `SELECT p.id_persona as id_aliado,p.nombres || p.apellidos nombre
                        FROM personas p,
                            personas_grupo_interes pgi,
                            parametros_detalle pd
                        WHERE p.id_persona = pgi.id_persona
                        AND pgi.id_grupo_interes = pd.id_parametro_detalle
                        AND pd.nombre='ALIADO_CULTIVARTE';`,
    responsablesResult: `SELECT pd.id_parametro_detalle as id_responsable, pd.nombre
                            FROM parametros_detalle pd
                            INNER JOIN parametros_generales pg
                            ON pd.id_parametro_general = pg.id_parametro_general
                            WHERE pg.nombre_parametro = 'RESPONSABLE_CULTIVARTE';`,
    nombreDeActividadResult: `SELECT 
                                pd.id_parametro_detalle as id_tipo_actividad,
                                pd.nombre,
                                pd.valores
                            FROM parametros_detalle pd 
                            INNER JOIN parametros_generales pg 
                            ON pd.id_parametro_general = pg.id_parametro_general
                            WHERE pg.nombre_parametro = 'TIPO_ACTIVIDAD_CULTIVARTE'
                            and pd.nombre in ('Contenido del ciclo','Actividad General');`,
    frecuenciasResult: `SELECT pd.id_parametro_detalle AS id_frecuencia,
                         pd.nombre
                    FROM parametros_detalle pd 
                    INNER JOIN parametros_generales pg 
                    ON pd.id_parametro_general = pg.id_parametro_general
                    WHERE pg.nombre_parametro = 'FRECUENCIA_CULTIVARTE';`,
    actividadesResult: `SELECT * 
                        FROM actividades
                        ORDER BY id_actividad LIMIT $1 OFFSET $2;`,
    actividadResult: `SELECT * FROM actividades WHERE id_actividad = $1;`,
    sesionesResult: `SELECT * FROM sesiones WHERE id_actividad = $1;`,
    insertActividad: `INSERT INTO actividades (
                            id_actividad, 
                            id_programa, 
                            id_tipo_actividad, 
                            id_responsable, 
                            id_aliado, 
                            id_sede, 
                            id_frecuencia, 
                            institucional, 
                            nombre_actividad, 
                            descripcion, 
                            fecha_actividad, 
                            hora_inicio, 
                            hora_fin, 
                            plazo_asistencia, 
                            estado, 
                            id_creado_por, 
                            fecha_creacion, 
                            id_modificado_por, 
                            fecha_modificacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`,
    updateActividad: `UPDATE actividades SET id_programa = $2, 
                             id_tipo_actividad = $3, 
                             id_responsable = $4, 
                             id_aliado = $5, 
                             id_sede = $6, 
                             id_frecuencia = $7, 
                             institucional = $8, 
                             nombre_actividad = $9, 
                             descripcion = $10, 
                             fecha_actividad = $11, 
                             hora_inicio = $12, 
                             hora_fin = $13, 
                             plazo_asistencia = $14, 
                             estado = $15, 
                             id_creado_por = $16, 
                             fecha_creacion = $17, 
                             id_modificado_por = $18, 
                             fecha_modificacion = $19 WHERE id_actividad = $1`,
    deleteActividad: `DELETE FROM actividades WHERE id_actividad = $1`,
    insertSesion: `INSERT INTO sesiones (
                            id_sesion, id_actividad, fecha_actividad, 
                            hora_inicio, hora_fin, id_creado_por, 
                            fecha_creacion, id_modificado_por, fecha_modificacion
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    actividadSedesResult: `SELECT a.*
                                FROM actividades a
                                WHERE a.fecha_actividad BETWEEN $1 AND $2
                                AND (
                                    -- Caso 1: el usuario tiene sedes y la actividad está en una de esas sedes
                                    EXISTS (
                                        SELECT 1
                                        FROM personas_sedes ps
                                        WHERE ps.id_persona = $3
                                        AND ps.id_sede = a.id_sede
                                    )
                                    OR
                                    -- Caso 2: el usuario NO tiene sedes → traer todas las actividades
                                    NOT EXISTS (
                                        SELECT 1
                                        FROM personas_sedes ps
                                        WHERE ps.id_persona = $3
                                    )
                                );`,
};
//# sourceMappingURL=actividad-queries.js.map