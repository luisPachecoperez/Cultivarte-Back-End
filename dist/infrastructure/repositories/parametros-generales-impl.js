"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametrosGeneralesRepositoryImpl = void 0;
class ParametrosGeneralesRepositoryImpl {
    constructor(parametrosGeneralesDataSource) {
        this.parametrosGeneralesDataSource = parametrosGeneralesDataSource;
    }
    async getAll() {
        return this.parametrosGeneralesDataSource.getAll();
    }
    async getById(id_parametro_general) {
        return this.parametrosGeneralesDataSource.getById(id_parametro_general);
    }
    async create(data) {
        return this.parametrosGeneralesDataSource.create(data);
    }
    async updateById(id_parametro_general, data) {
        return this.parametrosGeneralesDataSource.updateById(id_parametro_general, data);
    }
    async deleteById(id_parametro_general) {
        return this.parametrosGeneralesDataSource.deleteById(id_parametro_general);
    }
}
exports.ParametrosGeneralesRepositoryImpl = ParametrosGeneralesRepositoryImpl;
//# sourceMappingURL=parametros-generales-impl.js.map