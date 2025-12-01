"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSesionUseCaseImpl = void 0;
class DeleteSesionUseCaseImpl {
    constructor(sesionRepository) {
        this.sesionRepository = sesionRepository;
    }
    execute(id_sesion) {
        return this.sesionRepository.deleteById(id_sesion);
    }
}
exports.DeleteSesionUseCaseImpl = DeleteSesionUseCaseImpl;
//# sourceMappingURL=delete-sesion.js.map