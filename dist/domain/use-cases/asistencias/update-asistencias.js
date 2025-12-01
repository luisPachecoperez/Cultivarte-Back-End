"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAsistenciasUseCaseImpl = void 0;
class UpdateAsistenciasUseCaseImpl {
    constructor(asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }
    execute(asistenciaSesiones) {
        return this.asistenciaRepository.updateAsistencias(asistenciaSesiones);
    }
}
exports.UpdateAsistenciasUseCaseImpl = UpdateAsistenciasUseCaseImpl;
//# sourceMappingURL=update-asistencias.js.map