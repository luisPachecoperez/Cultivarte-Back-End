"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetActividadSedesUseCaseImpl = void 0;
class GetActividadSedesUseCaseImpl {
    constructor(actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
    execute(id_usuario, fecha_inicio, fecha_fin) {
        return this.actividadRepository.getActividadSedes(id_usuario, fecha_inicio, fecha_fin);
    }
}
exports.GetActividadSedesUseCaseImpl = GetActividadSedesUseCaseImpl;
//# sourceMappingURL=get-actividad-sedes.js.map