export const sedesQueries = {
  sedesResult: `SELECT * FROM sedes`,
  sedeById: `SELECT * FROM sedes WHERE id_sede = $1`,
  createSede: `INSERT INTO sedes (id_sede, id_pais, id_departamento, id_ciudad, id_regional_davivienda, id_regional_seguros_bolivar, id_tipo_inmueble, id_espacio, id_uso_inmueble, id_nivel_inmueble, id_condicion_urbana, id_clima, id_condicion_inmueble, nombre, numero_convenio, fecha_apertura_sede, matricula_inmobiliaria, id_creado_por, fecha_creacion, id_modificado_por, fecha_modificacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
  updateSede: `UPDATE sedes SET id_pais = $2, id_departamento = $3, id_ciudad = $4, id_regional_davivienda = $5, id_regional_seguros_bolivar = $6, id_tipo_inmueble = $7, id_espacio = $8, id_uso_inmueble = $9, id_nivel_inmueble = $10, id_condicion_urbana = $11, id_clima = $12, id_condicion_inmueble = $13, nombre = $14, numero_convenio = $15, fecha_apertura_sede = $16, matricula_inmobiliaria = $17, id_creado_por = $18, fecha_creacion = $19, id_modificado_por = $20, fecha_modificacion = $21 WHERE id_sede = $1`,
  deleteSede: `DELETE FROM sedes WHERE id_sede = $1`,
};
