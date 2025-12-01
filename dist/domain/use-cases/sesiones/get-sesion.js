"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSesionUseCaseImpl = void 0;
class GetSesionUseCaseImpl {
    constructor(sesionRepository) {
        this.sesionRepository = sesionRepository;
    }
    execute(id_sesion) {
        return this.sesionRepository.getById(id_sesion);
    }
}
exports.GetSesionUseCaseImpl = GetSesionUseCaseImpl;
//# sourceMappingURL=get-sesion.js.map