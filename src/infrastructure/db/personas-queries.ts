export const personaQueries = {
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

  resPersonaGrupoInteres: `SELECT 
                                pd.id_parametro_detalle as id_grupo_interes 
                            FROM parametros_detalle pd 
                            WHERE pd.nombre  = 'BENEFICIARIO_CULTIVARTE';`,

  tipoIdentificacionRes: `SELECT pd.id_parametro_detalle  as id_tipo_identificacion, 
                                   nombre from parametros_detalle pd 
                            INNER JOIN parametros_generales pg on pd.id_parametro_general  = pg.id_parametro_general
                            WHERE pg.nombre_parametro  = 'Tipo Identificacion'; `,

  tiposPersonaRes: `SELECT pd.id_parametro_detalle  as id_tipo_persona, 
                                   nombre from parametros_detalle pd 
                            INNER JOIN parametros_generales pg on pd.id_parametro_general  = pg.id_parametro_general
                            WHERE pg.nombre_parametro  = 'Tipo Persona'; `,

  sexoInfoRes: `SELECT pd.id_parametro_detalle  as id_sexo, 
                                   nombre from parametros_detalle pd 
                            INNER JOIN parametros_generales pg on pd.id_parametro_general  = pg.id_parametro_general
                            WHERE pg.nombre_parametro  = 'Genero';`,

  ubicacionesRes: `SELECT pd.id_parametro_detalle  as id_ubicacion, 
                                   nombre from parametros_detalle pd 
                            INNER JOIN parametros_generales pg on pd.id_parametro_general  = pg.id_parametro_general
                            WHERE pg.nombre_parametro  = 'Ubicacion';`,

  sedesRes: `SELECT s.id_sede as id_sede, 
                         s.nombre
                    FROM personas_sedes ps
                    JOIN sedes s ON ps.id_sede = s.id_sede
                    WHERE ps.id_persona = $1`,

  paisesRes: `SELECT p.id_poblacion as id_pais, 
                     p.nombre as nombre 
              FROM poblaciones p 
              WHERE p.nombre  = 'Colombia';`,

  allSedesRes: ` SELECT s.id_sede as id_sede,
               s.nombre
           FROM sedes s;
                
          `,

  getAll: `SELECT * 
                FROM personas 
                ORDER BY id_persona 
                LIMIT $1 OFFSET $2;`,
  getById: `SELECT * FROM personas WHERE id_persona = $1;`,
  createPersona: `INSERT INTO personas (id_persona, nombres, apellidos, correo, telefono, id_creado_por, fecha_creacion, id_modificado_por, fecha_modificacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
  updatePersona: `UPDATE personas SET nombres = $2, apellidos = $3, correo = $4, telefono = $5, id_creado_por = $6, fecha_creacion = $7, id_modificado_por = $8, fecha_modificacion = $9 WHERE id_persona = $1`,
  deletePersona: `DELETE FROM personas WHERE id_persona = $1`,
  getAliadosSede: `SELECT p.*
                     FROM personas p
                     JOIN personas_grupo_interes pgi
                     ON p.id_persona = pgi.id_persona
                     JOIN parametros_detalle pd
                     ON pgi.id_grupo_interes = pd.id_parametro_detalle
                     WHERE UPPER(pd.nombre) = 'ALIADOS_CULTIVARTE'
                     AND (
                         -- Caso 1: usuario tiene sedes → personas de esas sedes
                         EXISTS (
                             SELECT 1
                             FROM personas_sedes ps
                             WHERE ps.id_persona = $1
                         )
                         OR
                         -- Caso 2: usuario no tiene sedes → traer todas las personas
                         NOT EXISTS (
                             SELECT 1
                             FROM personas_sedes ps
                             WHERE ps.id_persona = $1
                         )
                     );`,

  // getBeneficiariosSede: Retorna personas reales asociadas a una sede específica.
  // Utiliza varias tablas y relaciones para obtener datos completos de personas y su sede.
  getBeneficiariosSede: `SELECT p.*, ps.id_sede
                            FROM personas p
                            JOIN personas_grupo_interes pgi
                            ON p.id_persona = pgi.id_persona
                            JOIN parametros_detalle pd
                            ON pgi.id_grupo_interes = pd.id_parametro_detalle
                            LEFT JOIN personas_sedes ps
                            ON p.id_persona = ps.id_persona
                            WHERE UPPER(pd.nombre) = 'BENEFICIARIO_CULTIVARTE';`,

  // getBeneficiarios: Retorna beneficiarios desde la tabla de parámetros.
  // No necesariamente son personas reales, y no filtra por sede.
  getBeneficiarios: `SELECT 
                        pd.id_parametro_detalle AS id_persona,
                        pd.nombre AS nombre_completo,
                        ''::text AS id_sede
                        FROM parametros_detalle pd
                        INNER JOIN parametros_generales pg
                        ON pd.id_parametro_general = pg.id_parametro_general
                        WHERE pg.nombre_parametro = 'BENEFICIARIO_CULTIVARTE';`,

  getPreBeneficiarios: `SELECT * 
                          FROM personas 
                          WHERE id_creado_por = $1;`,

  getPersonasParams: `SELECT 
                                p.*
                            FROM personas p
                                JOIN personas_sedes ps
                                ON p.id_persona = ps.id_persona
                                JOIN personas_programas pp
                                ON p.id_persona = pp.id_persona
                                JOIN personas_grupo_interes pgi
                                ON p.id_persona = pgi.id_persona
                            WHERE ps.id_sede = $1
                            AND pp.id_programa = $2
                            AND pgi.id_grupo_interes = $3
                            ORDER BY p.id_persona
                            LIMIT $4 OFFSET $5;`,

  getPersonaByTipoIdenficacionNumeroIdentificacion: `SELECT p.* 
                                                    FROM personas p 
                                                    WHERE p.id_tipo_identificacion = $1 
                                                    AND p.identificacion = $2;`,

  updateBeneficiarios: `UPDATE personas 
                        SET nombres = $2,
                            apellidos = $3,
                            correo = $4, 
                            telefono = $5, 
                            id_creado_por = $6, 
                            fecha_creacion = $7,
                            id_modificado_por = $8,
                            fecha_modificacion = $9 
                            WHERE id_persona = $1`,

  upsertPersona: `INSERT INTO personas (
                        id_persona,
                        id_sede,
                        id_tipo_persona,
                        id_colegio,
                        id_sexo,
                        id_ubicacion,
                        id_pais,
                        id_departamento,
                        id_ciudad,
                        id_tipo_identificacion,
                        identificacion,
                        nombres,
                        apellidos,
                        razon_social,
                        fecha_nacimiento,
                        id_tipo_identificacion_acudiente,
                        identificacion_acudiente,
                        nombre_acudiente,
                        apellidos_acudiente,
                        correo_acudiente,
                        celular_acudiente,
                        archivo_habeas_data,
                        acepta_habeas_data,
                        fecha_habeas_data,
                        canal_habeas_data,
                        soporte_habeas_data,
                        dir_ip_habeas_data,
                        email,
                        email_contacto,
                        telefono_movil_contacto,
                        telefono_movil,
                        eliminado,
                        discapacitado,
                        id_creado_por,
                        fecha_creacion,
                        id_modificado_por,
                        fecha_modificacion,
                        id_eps,
                        direccion
                    )
                    VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
                        $31, $32, $33, $34, $35, $36, $37, $38, $39
                    )
                    ON CONFLICT (id_persona) DO UPDATE
                    SET
                        id_sede = EXCLUDED.id_sede,
                        id_tipo_persona = EXCLUDED.id_tipo_persona,
                        id_colegio = EXCLUDED.id_colegio,
                        id_sexo = EXCLUDED.id_sexo,
                        id_ubicacion = EXCLUDED.id_ubicacion,
                        id_pais = EXCLUDED.id_pais,
                        id_departamento = EXCLUDED.id_departamento,
                        id_ciudad = EXCLUDED.id_ciudad,
                        id_tipo_identificacion = EXCLUDED.id_tipo_identificacion,
                        identificacion = EXCLUDED.identificacion,
                        nombres = EXCLUDED.nombres,
                        apellidos = EXCLUDED.apellidos,
                        razon_social = EXCLUDED.razon_social,
                        fecha_nacimiento = EXCLUDED.fecha_nacimiento,
                        id_tipo_identificacion_acudiente = EXCLUDED.id_tipo_identificacion_acudiente,
                        identificacion_acudiente = EXCLUDED.identificacion_acudiente,
                        nombre_acudiente = EXCLUDED.nombre_acudiente,
                        apellidos_acudiente = EXCLUDED.apellidos_acudiente,
                        correo_acudiente = EXCLUDED.correo_acudiente,
                        celular_acudiente = EXCLUDED.celular_acudiente,
                        archivo_habeas_data = EXCLUDED.archivo_habeas_data,
                        acepta_habeas_data = EXCLUDED.acepta_habeas_data,
                        fecha_habeas_data = EXCLUDED.fecha_habeas_data,
                        canal_habeas_data = EXCLUDED.canal_habeas_data,
                        soporte_habeas_data = EXCLUDED.soporte_habeas_data,
                        dir_ip_habeas_data = EXCLUDED.dir_ip_habeas_data,
                        email = EXCLUDED.email,
                        email_contacto = EXCLUDED.email_contacto,
                        telefono_movil_contacto = EXCLUDED.telefono_movil_contacto,
                        telefono_movil = EXCLUDED.telefono_movil,
                        eliminado = EXCLUDED.eliminado,
                        discapacitado = EXCLUDED.discapacitado,
                        id_modificado_por = EXCLUDED.id_modificado_por,
                        fecha_modificacion = EXCLUDED.fecha_modificacion,
                        id_eps = EXCLUDED.id_eps,
                        direccion = EXCLUDED.direccion
                    RETURNING id_persona;`,

  ensurePersonaGrupoInteres: `INSERT INTO personas_grupo_interes (
                                                                id_personas_grupo_interes,
                                                                id_persona,
                                                                id_grupo_interes
                                                            )
                                                            SELECT $1, $2, $3
                                                            WHERE NOT EXISTS (
                                                                SELECT 1
                                                                FROM personas_grupo_interes
                                                                WHERE id_persona = $2
                                                                    AND id_grupo_interes = $3
                                                            );`,

  ensurePersonaPrograma: `INSERT INTO personas_programas (
                                                            id_persona_programa,
                                                            id_persona,
                                                            id_programa
                                                        )
                                                        SELECT $1, $2, $3
                                                        WHERE NOT EXISTS (
                                                            SELECT 1
                                                            FROM personas_programas
                                                            WHERE id_persona = $2
                                                                AND id_programa = $3
                                                        );`,

  selectPersonaSede: `SELECT id_personas_sede, id_sede
                                                FROM personas_sedes
                                                WHERE id_persona = $1;`,

  insertPersonaSede: `INSERT INTO personas_sedes (
                                                    id_personas_sede,
                                                    id_persona,
                                                    id_sede
                                                )
                                                VALUES ($1, $2, $3);`,

  updatePersonaSede: `UPDATE personas_sedes
                                                SET id_sede = $2
                                                WHERE id_persona = $1;`,

  deletePersonaGrupoInteres: `DELETE FROM personas_grupo_interes
                                                                WHERE id_persona = $1
                                                                    AND id_grupo_interes = $2;`,

  deletePersonaPrograma: `DELETE FROM personas_programas
                                                         WHERE id_persona = $1
                                                             AND id_programa = $2;`,

  deletePersonaSede: `DELETE FROM personas_sedes
                                                WHERE id_persona = $1;`,

  softDeletePersona: `UPDATE personas
                                                SET eliminado = 'S',
                                                        fecha_modificacion = NOW()
                                                WHERE id_persona = $1;`,
};
