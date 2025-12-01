"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametriaEventosController = void 0;
class ParametriaEventosController {
    constructor(getParametriaEventosUseCase) {
        this.getParametriaEventosUseCase = getParametriaEventosUseCase;
    }
    async getAll() {
        return this.getParametriaEventosUseCase.execute();
    }
}
exports.ParametriaEventosController = ParametriaEventosController;
//# sourceMappingURL=parametria-eventos-controller.js.map