"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSesionUseCaseImpl = void 0;
class UpdateSesionUseCaseImpl {
    constructor(sesionRepository) {
        this.sesionRepository = sesionRepository;
    }
    execute(id_sesion, sesion) {
        return this.sesionRepository.updateById(id_sesion, sesion);
    }
}
exports.UpdateSesionUseCaseImpl = UpdateSesionUseCaseImpl;
//# sourceMappingURL=update-sesion.js.map