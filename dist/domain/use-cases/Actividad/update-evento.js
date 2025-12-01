"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActividadUseCaseImpl = void 0;
class UpdateActividadUseCaseImpl {
    constructor(actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
    execute(id_actividad, actividad) {
        return this.actividadRepository.updateById(id_actividad, actividad);
    }
}
exports.UpdateActividadUseCaseImpl = UpdateActividadUseCaseImpl;
//# sourceMappingURL=update-evento.js.map