"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametriaEventosRepositoryImpl = void 0;
class ParametriaEventosRepositoryImpl {
    constructor(parametriaEventosDataSource) {
        this.parametriaEventosDataSource = parametriaEventosDataSource;
    }
    async getAll() {
        const rows = await this.parametriaEventosDataSource.getAll();
        const temp = {};
        rows.forEach((row) => {
            if (!temp[row.grupo]) {
                temp[row.grupo] = [];
            }
            temp[row.grupo].push({
                id: row.id,
                nombre: row.nombre,
            });
        });
        return temp;
    }
}
exports.ParametriaEventosRepositoryImpl = ParametriaEventosRepositoryImpl;
//# sourceMappingURL=parametria-eventos-impl.js.map