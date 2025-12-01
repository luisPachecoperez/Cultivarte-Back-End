"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePoblacionUseCaseImpl = void 0;
class CreatePoblacionUseCaseImpl {
    constructor(poblacionRepository) {
        this.poblacionRepository = poblacionRepository;
    }
    async execute(poblacion) {
        return this.poblacionRepository.createPoblacion(poblacion);
    }
}
exports.CreatePoblacionUseCaseImpl = CreatePoblacionUseCaseImpl;
//# sourceMappingURL=create-poblacion.js.map