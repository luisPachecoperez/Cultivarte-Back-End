"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPoblacionesUseCaseImpl = void 0;
class GetPoblacionesUseCaseImpl {
    constructor(poblacionRepository) {
        this.poblacionRepository = poblacionRepository;
    }
    async execute() {
        return this.poblacionRepository.getPoblaciones();
    }
}
exports.GetPoblacionesUseCaseImpl = GetPoblacionesUseCaseImpl;
//# sourceMappingURL=get-poblaciones.js.map