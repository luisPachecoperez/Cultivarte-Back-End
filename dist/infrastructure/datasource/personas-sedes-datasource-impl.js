"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasSedesDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const personas_sedes_queries_1 = require("../db/personas-sedes-queries");
class PersonasSedesDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll() {
        try {
            const getAllRes = await this.pool.query(personas_sedes_queries_1.personasSedesQueries.getAll);
            return getAllRes.rows;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al obtener personas sedes: ${mensaje}`,
            };
        }
    }
    async getById(id_sede) {
        try {
            const getByIdRes = await this.pool.query(personas_sedes_queries_1.personasSedesQueries.getById, [
                id_sede,
            ]);
            return getByIdRes.rows[0] || null;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al obtener persona sede: ${mensaje}`,
            };
        }
    }
    async create(personaSede) {
        try {
            const values = [
                personaSede.id_personas_sede,
                personaSede.id_persona,
                personaSede.id_sede,
            ];
            await this.pool.query(personas_sedes_queries_1.personasSedesQueries.create, values);
            return { exitoso: 'S', mensaje: 'Persona sede creada correctamente' };
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al crear persona sede: ${mensaje}`,
            };
        }
    }
    async updateById(id_personas_sede, personaSede) {
        try {
            const values = [
                personaSede.id_personas_sede,
                personaSede.id_persona,
                personaSede.id_sede,
                id_personas_sede,
            ];
            await this.pool.query(personas_sedes_queries_1.personasSedesQueries.updateById, values);
            return {
                exitoso: 'S',
                mensaje: 'Persona sede actualizada correctamente',
            };
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al actualizar persona sede: ${mensaje}`,
            };
        }
    }
    async deleteById(id_personas_sede) {
        try {
            await this.pool.query(personas_sedes_queries_1.personasSedesQueries.deleteById, [
                id_personas_sede,
            ]);
            return { exitoso: 'S', mensaje: 'Persona sede eliminada correctamente' };
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al eliminar persona sede: ${mensaje}`,
            };
        }
    }
}
exports.PersonasSedesDataSourceImpl = PersonasSedesDataSourceImpl;
//# sourceMappingURL=personas-sedes-datasource-impl.js.map