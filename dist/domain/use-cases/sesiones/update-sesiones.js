"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSesionesUseCaseImpl = void 0;
class UpdateSesionesUseCaseImpl {
    constructor(sesionRepository) {
        this.sesionRepository = sesionRepository;
    }
    async execute(editarSesiones) {
        return this.sesionRepository.updateSesiones(editarSesiones);
    }
}
exports.UpdateSesionesUseCaseImpl = UpdateSesionesUseCaseImpl;
//# sourceMappingURL=update-sesiones.js.map