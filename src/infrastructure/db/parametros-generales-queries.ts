export const parametrosGeneralesQueries = {
    
    getAll: `SELECT * FROM parametros_generales`,

    getById: `SELECT * FROM parametros_detalle WHERE id_parametro_general = $1`,

    create: `INSERT INTO parametros_generales (
                nombre_parametro, 
                codigo, 
                orden, 
                valores,
                estado
                ) VALUES (
                $1,$2,$3,$4,$5
            ) RETURNING *`,

    updateById: `UPDATE 
        parametros_generales 
        SET nombre_parametro = $2, 
        codigo = $3, 
        orden = $4, 
        valores = $5, 
        estado = $6 
        WHERE id_parametro_general = $1 RETURNING *`,

    deleteById: `DELETE FROM parametros_generales WHERE id_parametro_general = $1`,
}
