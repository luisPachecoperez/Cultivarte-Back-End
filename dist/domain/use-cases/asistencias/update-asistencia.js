"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAsistenciaUseCaseImpl = void 0;
class UpdateAsistenciaUseCaseImpl {
    constructor(asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }
    execute(id_asistencia, asistencia) {
        return this.asistenciaRepository.updateById(id_asistencia, asistencia);
    }
}
exports.UpdateAsistenciaUseCaseImpl = UpdateAsistenciaUseCaseImpl;
//# sourceMappingURL=update-asistencia.js.map