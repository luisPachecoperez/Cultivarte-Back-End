"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const personas_queries_1 = require("../db/personas-queries");
class PersonaDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll(limit, offset) {
        try {
            const res = await this.pool.query(personas_queries_1.personaQueries.getAll, [limit, offset]);
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
    async getById(id_persona) {
        try {
            const res = await this.pool.query(personas_queries_1.personaQueries.getById, [id_persona]);
            return res.rows[0] || null;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async createPersona(persona) {
        try {
            const res = await this.pool.query(personas_queries_1.personaQueries.createPersona, [
                persona,
            ]);
            return res.rows[0] || null;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo crear persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updatePersona(id_persona, persona) {
        try {
            const res = await this.pool.query(personas_queries_1.personaQueries.updatePersona, [
                id_persona,
                persona,
            ]);
            return res.rows[0] || null;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deletePersona(id_persona) {
        try {
            const res = await this.pool.query(personas_queries_1.personaQueries.deletePersona, [
                id_persona,
            ]);
            return (res.rows[0] || {
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
    async getAliadosSede(id_usuario) {
        try {
            const res = await this.pool.query(personas_queries_1.personaQueries.getAliadosSede, [
                id_usuario,
            ]);
            return res.rows || [];
        }
        catch (error) {
            console.error('Error en getAliadosSede:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener aliados: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getBenSedes() {
        try {
            const res = await this.pool.query(personas_queries_1.personaQueries.getBeneficiariosSede);
            return res.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener beneficiarios: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getBeneficiarios() {
        try {
            const res = await this.pool.query(personas_queries_1.personaQueries.getBeneficiarios);
            return res.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener beneficiarios: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
}
exports.PersonaDataSourceImpl = PersonaDataSourceImpl;
//# sourceMappingURL=personas-datasource-impl.js.map