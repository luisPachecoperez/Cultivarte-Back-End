export const excepcionesQueries = {
  getExcepciones: `SELECT * FROM excepciones`,

  findMensajeByError: `SELECT mensaje FROM excepciones WHERE error = $1 LIMIT 1`,

  createExcepcion: `INSERT INTO excepciones (
                        id_excepcion,
                        error,
                        mensaje,
                        id_creado_por,
                        fecha_creacion,
                        fecha_modificacion
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6
                    ) RETURNING *`,
  updateExcepciones: `UPDATE excepciones 
                        SET error = $2,
                        mensaje = $3,
                        fecha_modificacion = $4 
                        WHERE id_excepcion = $1`,

  deleteExcepciones: `DELETE FROM excepciones WHERE id_excepcion = $1`,
};
