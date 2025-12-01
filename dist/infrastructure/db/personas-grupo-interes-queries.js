"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personasGrupoInteresQueries = void 0;
exports.personasGrupoInteresQueries = {
    getAll: `SELECT * FROM personas_grupo_interes`,
    getById: `SELECT * FROM personas_grupo_interes WHERE id_persona_grupo_interes = $1`,
    createPersonaGrupoInteres: `INSERT INTO personas_grupo_interes (id_persona_grupo_interes, id_persona, id_grupo_interes) VALUES ($1, $2, $3) RETURNING *`,
    updatePersonaGrupoInteres: `UPDATE personas_grupo_interes SET id_persona = $2, id_grupo_interes = $3 WHERE id_persona_grupo_interes = $1 RETURNING *`,
    deletePersonaGrupoInteres: `DELETE FROM personas_grupo_interes WHERE id_persona_grupo_interes = $1 RETURNING *`,
};
//# sourceMappingURL=personas-grupo-interes-queries.js.map