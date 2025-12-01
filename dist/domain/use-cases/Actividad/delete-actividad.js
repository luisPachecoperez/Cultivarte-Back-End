"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteActividadUseCaseImpl = void 0;
class DeleteActividadUseCaseImpl {
    constructor(actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
    execute(id_actividad) {
        console.log(id_actividad);
        return this.actividadRepository.deleteById(id_actividad);
    }
}
exports.DeleteActividadUseCaseImpl = DeleteActividadUseCaseImpl;
//# sourceMappingURL=delete-actividad.js.map