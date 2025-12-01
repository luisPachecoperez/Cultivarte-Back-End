"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePoblacionUseCaseImpl = void 0;
class DeletePoblacionUseCaseImpl {
    constructor(poblacionRepository) {
        this.poblacionRepository = poblacionRepository;
    }
    async execute(id_poblacion) {
        return this.poblacionRepository.deletePoblacionById(id_poblacion);
    }
}
exports.DeletePoblacionUseCaseImpl = DeletePoblacionUseCaseImpl;
//# sourceMappingURL=delete-poblacion.js.map