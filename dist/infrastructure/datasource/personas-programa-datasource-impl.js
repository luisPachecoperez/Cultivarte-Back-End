"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasProgramaDataSourceImpl = void 0;
const pg_pool_1 = require("./../db/pg-pool");
const personas_programa_queries_1 = require("../db/personas-programa-queries");
class PersonasProgramaDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll() {
        try {
            const result = await this.pool.query(personas_programa_queries_1.personasProgramaQueries.getAll);
            return result.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener personas: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getById(id_persona_programa) {
        try {
            const result = await this.pool.query(personas_programa_queries_1.personasProgramaQueries.getById, [
                id_persona_programa,
            ]);
            return (result.rows[0] ?? {
                exitoso: 'N',
                mensaje: 'Persona programa no encontrada',
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
    async create(personaPrograma) {
        try {
            const result = await this.pool.query(personas_programa_queries_1.personasProgramaQueries.create, [
                personaPrograma.id_persona_programa,
                personaPrograma.id_persona,
                personaPrograma.id_programa,
            ]);
            return (result.rows[0] ?? {
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
    async updateById(id_persona_programa, personaPrograma) {
        try {
            const result = await this.pool.query(personas_programa_queries_1.personasProgramaQueries.updateById, [
                id_persona_programa,
                personaPrograma.id_persona,
                personaPrograma.id_programa,
            ]);
            return (result.rows[0] ?? {
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
    async deleteById(id_persona_programa) {
        try {
            const result = await this.pool.query(personas_programa_queries_1.personasProgramaQueries.deleteById, [
                id_persona_programa,
            ]);
            return (result.rows[0] ?? {
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
}
exports.PersonasProgramaDataSourceImpl = PersonasProgramaDataSourceImpl;
//# sourceMappingURL=personas-programa-datasource-impl.js.map