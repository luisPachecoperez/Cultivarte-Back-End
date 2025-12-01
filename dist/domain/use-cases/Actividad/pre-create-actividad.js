"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPreCreateActividadUseCaseImpl = void 0;
class GetPreCreateActividadUseCaseImpl {
    constructor(actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
    execute(id_usuario) {
        return this.actividadRepository.getPreCreateActividad(id_usuario);
    }
}
exports.GetPreCreateActividadUseCaseImpl = GetPreCreateActividadUseCaseImpl;
//# sourceMappingURL=pre-create-actividad.js.map