"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAsistenciaUseCaseImpl = void 0;
class GetAsistenciaUseCaseImpl {
    constructor(asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }
    execute(id_asistencia) {
        return this.asistenciaRepository.getById(id_asistencia);
    }
}
exports.GetAsistenciaUseCaseImpl = GetAsistenciaUseCaseImpl;
//# sourceMappingURL=get-asistencia.js.map