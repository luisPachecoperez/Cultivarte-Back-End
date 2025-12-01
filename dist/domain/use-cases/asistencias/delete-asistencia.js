"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAsistenciaUseCaseImpl = void 0;
class DeleteAsistenciaUseCaseImpl {
    constructor(asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }
    execute(id_asistencia) {
        return this.asistenciaRepository.deleteById(id_asistencia);
    }
}
exports.DeleteAsistenciaUseCaseImpl = DeleteAsistenciaUseCaseImpl;
//# sourceMappingURL=delete-asistencia.js.map