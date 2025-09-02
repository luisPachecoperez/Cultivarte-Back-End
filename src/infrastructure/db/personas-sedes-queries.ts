export const personasSedesQueries = {
    getAll: 'SELECT * FROM personas_sedes',
    getById: 'SELECT * FROM personas_sedes WHERE id_sede = $1',
    create: 'INSERT INTO personas_sedes (id_persona, id_sede, id_tipo_persona) VALUES ($1, $2, $3)',
    updateById: 'UPDATE personas_sedes SET id_persona = $2, id_sede = $3, id_tipo_persona = $4 WHERE id_sede = $1',
    deleteById: 'DELETE FROM personas_sedes WHERE id_sede = $1',
};