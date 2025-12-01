"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSesionesUseCaseImpl = void 0;
class GetSesionesUseCaseImpl {
    constructor(sesionRepository) {
        this.sesionRepository = sesionRepository;
    }
    execute(limit, offset) {
        return this.sesionRepository.getAll(limit, offset);
    }
}
exports.GetSesionesUseCaseImpl = GetSesionesUseCaseImpl;
//# sourceMappingURL=get-sesiones.js.map