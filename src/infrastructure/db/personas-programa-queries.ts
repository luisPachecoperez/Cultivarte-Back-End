export const personasProgramaQueries = {
    getAll: 'SELECT * FROM personas_programas',
    getById: 'SELECT * FROM personas_programas WHERE id_persona_programa = $1',
    create: 'INSERT INTO personas_programas (id_persona_programa, id_persona, id_programa) VALUES ($1, $2, $3)',
    updateById: 'UPDATE personas_programas SET id_persona = $2, id_programa = $3 WHERE id_persona_programa = $1',
    deleteById: 'DELETE FROM personas_programas WHERE id_persona_programa = $1'
};