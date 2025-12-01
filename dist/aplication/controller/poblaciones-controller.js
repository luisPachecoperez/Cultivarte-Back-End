"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoblacionesController = void 0;
class PoblacionesController {
    constructor(getPoblacionesUseCase, getPoblacionUseCase, createPoblacionUseCase, updatePoblacionUseCase, deletePoblacionUseCase) {
        this.getPoblacionesUseCase = getPoblacionesUseCase;
        this.getPoblacionUseCase = getPoblacionUseCase;
        this.createPoblacionUseCase = createPoblacionUseCase;
        this.updatePoblacionUseCase = updatePoblacionUseCase;
        this.deletePoblacionUseCase = deletePoblacionUseCase;
    }
    async getPoblaciones() {
        return this.getPoblacionesUseCase.execute();
    }
    async getPoblacion(id_poblacion) {
        const result = await this.getPoblacionUseCase.execute(id_poblacion);
        if ('exitoso' in result && result.exitoso === 'N') {
            return result;
        }
        return result;
    }
    async createPoblacion(poblacion) {
        return this.createPoblacionUseCase.execute(poblacion);
    }
    async updatePoblacion(id_poblacion, poblacion) {
        return this.updatePoblacionUseCase.execute(id_poblacion, poblacion);
    }
    async deletePoblacion(id_poblacion) {
        return this.deletePoblacionUseCase.execute(id_poblacion);
    }
}
exports.PoblacionesController = PoblacionesController;
//# sourceMappingURL=poblaciones-controller.js.map