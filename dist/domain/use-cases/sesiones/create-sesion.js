"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSesionUseCaseImpl = void 0;
class CreateSesionUseCaseImpl {
    constructor(sesionRepository) {
        this.sesionRepository = sesionRepository;
    }
    execute(sesion) {
        return this.sesionRepository.createSesion(sesion);
    }
}
exports.CreateSesionUseCaseImpl = CreateSesionUseCaseImpl;
//# sourceMappingURL=create-sesion.js.map