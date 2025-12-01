"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePoblacionUseCaseImpl = void 0;
class UpdatePoblacionUseCaseImpl {
    constructor(poblacionRepository) {
        this.poblacionRepository = poblacionRepository;
    }
    async execute(id_poblacion, poblacion) {
        return this.poblacionRepository.updatePoblacionById(id_poblacion, poblacion);
    }
}
exports.UpdatePoblacionUseCaseImpl = UpdatePoblacionUseCaseImpl;
//# sourceMappingURL=update-poblacion.js.map