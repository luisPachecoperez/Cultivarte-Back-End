"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActividadUseCaseImpl = void 0;
class CreateActividadUseCaseImpl {
    constructor(actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
    async execute(actividad) {
        return this.actividadRepository.createActividad(actividad);
    }
}
exports.CreateActividadUseCaseImpl = CreateActividadUseCaseImpl;
//# sourceMappingURL=create-actividad.js.map