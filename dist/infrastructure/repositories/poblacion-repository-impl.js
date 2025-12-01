"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoblacionRepositoryImpl = void 0;
class PoblacionRepositoryImpl {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createPoblacion(poblacion) {
        try {
            const result = await this.dataSource.createPoblacion(poblacion);
            return result;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo crear población: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updatePoblacionById(id_poblacion, poblacion) {
        try {
            const result = await this.dataSource.updatePoblacionById(id_poblacion, poblacion);
            return result;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar población: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deletePoblacionById(id_poblacion) {
        try {
            const result = await this.dataSource.deletePoblacionById(id_poblacion);
            return result;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo eliminar población: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getPoblaciones() {
        try {
            const result = await this.dataSource.getPoblaciones();
            return result;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener poblaciones: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getPoblacionById(id_poblacion) {
        try {
            const result = await this.dataSource.getPoblacionById(id_poblacion);
            return result;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener población por id: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
}
exports.PoblacionRepositoryImpl = PoblacionRepositoryImpl;
//# sourceMappingURL=poblacion-repository-impl.js.map