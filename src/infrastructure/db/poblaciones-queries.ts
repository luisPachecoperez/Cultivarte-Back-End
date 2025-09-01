export const poblacionesQueries = {
    poblacionesResult: `SELECT * FROM poblaciones`,
    poblacionById: `SELECT id_poblacion, id_padre, nombre FROM poblaciones WHERE id_poblacion = $1`,
    createPoblacion: `INSERT INTO poblaciones (id_poblacion, id_padre, nombre) VALUES ($1, $2, $3) RETURNING *`,
    updatePoblacion: `UPDATE poblaciones SET nombre = $2, id_padre = $3 WHERE id_poblacion = $1 RETURNING *`,
    deletePoblacion: `DELETE FROM poblaciones WHERE id_poblacion = $1 RETURNING *`,
}