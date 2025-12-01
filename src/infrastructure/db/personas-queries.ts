export const personaQueries = {
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
};
