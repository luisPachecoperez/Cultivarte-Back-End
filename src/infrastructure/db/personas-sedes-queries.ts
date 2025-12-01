export const personasSedesQueries = {
  getAll: 'SELECT * FROM personas_sedes',
  getById: 'SELECT * FROM personas_sedes WHERE id_sede = $1',
  create:
    'INSERT INTO personas_sedes ( id_persona_sede, id_persona, id_sede) VALUES ($1, $2, $3)',
  updateById:
    'UPDATE personas_sedes SET id_persona_sede = $1, id_persona = $2, id_sede = $3 WHERE id_persona_sede = $1',
  deleteById: 'DELETE FROM personas_sedes WHERE id_persona_sede = $1',
};
