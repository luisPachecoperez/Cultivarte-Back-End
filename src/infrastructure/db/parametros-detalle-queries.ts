export const parametrosDetalleQueries = {   
    getAll: `SELECT * FROM parametros_detalle`,

    getById: `SELECT * FROM parametros_detalle WHERE id_parametro_general = $1`,

    create: `INSERT INTO parametros_detalle (
                id_parametro_general,
                nombre,
                codigo,
                orden,
                valores,
                estado
                ) VALUES (
                $1,$2,$3,$4,$5,$6
            ) RETURNING *`,

    updateById: `UPDATE 
        parametros_detalle 
        SET nombre = $2, 
        codigo = $3, 
        orden = $4, 
        valores = $5, 
        estado = $6 
        WHERE id_parametro_general = $1 RETURNING *`,

    deleteById: `DELETE FROM parametros_detalle WHERE id_parametro_general = $1`,
}