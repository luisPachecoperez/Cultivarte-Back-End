export const poblacionesQueries = {
    poblacionesResult: `SELECT * FROM poblaciones`,
    createPoblacion: `INSERT INTO poblaciones (id_poblacion, nombre, id_sede) VALUES ($1, $2, $3) RETURNING *`,
    updatePoblacion: `UPDATE poblaciones SET nombre = $2, id_sede = $3 WHERE id_poblacion = $1 RETURNING *`,
    deletePoblacion: `DELETE FROM poblaciones WHERE id_poblacion = $1 RETURNING *`,
    
}
