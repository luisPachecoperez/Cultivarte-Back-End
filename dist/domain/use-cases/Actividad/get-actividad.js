"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetActividadUseCaseImpl = void 0;
class GetActividadUseCaseImpl {
    constructor(actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
    execute(id_actividad) {
        return this.actividadRepository.getById(id_actividad);
    }
}
exports.GetActividadUseCaseImpl = GetActividadUseCaseImpl;
//# sourceMappingURL=get-actividad.js.map