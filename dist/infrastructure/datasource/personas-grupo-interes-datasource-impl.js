"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasGrupoInteresDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const personas_grupo_interes_queries_1 = require("../db/personas-grupo-interes-queries");
class PersonasGrupoInteresDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async create(personaGrupoInteres) {
        try {
            const res = await this.pool.query(personas_grupo_interes_queries_1.personasGrupoInteresQueries.createPersonaGrupoInteres, [personaGrupoInteres]);
            return (res.rows[0] ?? {
                exitoso: 'N',
                mensaje: 'No se pudo crear persona',
            });
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo crear persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateById(id_persona_grupo_interes, personaGrupoInteres) {
        try {
            const res = await this.pool.query(personas_grupo_interes_queries_1.personasGrupoInteresQueries.updatePersonaGrupoInteres, [id_persona_grupo_interes, personaGrupoInteres]);
            return (res.rows[0] ?? {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar persona',
            });
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deleteById(id_persona_grupo_interes) {
        try {
            const res = await this.pool.query(personas_grupo_interes_queries_1.personasGrupoInteresQueries.deletePersonaGrupoInteres, [id_persona_grupo_interes]);
            return (res.rows[0] ?? {
                exitoso: 'N',
                mensaje: 'No se pudo eliminar persona',
            });
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo eliminar persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getAll() {
        try {
            const res = await this.pool.query(personas_grupo_interes_queries_1.personasGrupoInteresQueries.getAll);
            return res.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener personas: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getById(id_persona_grupo_interes) {
        try {
            const res = await this.pool.query(personas_grupo_interes_queries_1.personasGrupoInteresQueries.getById, [
                id_persona_grupo_interes,
            ]);
            return (res.rows[0] ?? {
                exitoso: 'N',
                mensaje: 'Persona no encontrada',
            });
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
}
exports.PersonasGrupoInteresDataSourceImpl = PersonasGrupoInteresDataSourceImpl;
//# sourceMappingURL=personas-grupo-interes-datasource-impl.js.map