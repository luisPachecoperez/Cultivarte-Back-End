"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPreEditActividadUseCaseImpl = void 0;
class GetPreEditActividadUseCaseImpl {
    constructor(actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
    execute(id_actividad, id_usuario) {
        return this.actividadRepository.getPreEditActividad(id_actividad, id_usuario);
    }
}
exports.GetPreEditActividadUseCaseImpl = GetPreEditActividadUseCaseImpl;
//# sourceMappingURL=pre-edit-actividad.js.map