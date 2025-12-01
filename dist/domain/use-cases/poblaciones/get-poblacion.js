"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPoblacionUseCaseImpl = void 0;
class GetPoblacionUseCaseImpl {
    constructor(poblacionRepository) {
        this.poblacionRepository = poblacionRepository;
    }
    async execute(id_poblacion) {
        return this.poblacionRepository.getPoblacionById(id_poblacion);
    }
}
exports.GetPoblacionUseCaseImpl = GetPoblacionUseCaseImpl;
//# sourceMappingURL=get-poblacion.js.map