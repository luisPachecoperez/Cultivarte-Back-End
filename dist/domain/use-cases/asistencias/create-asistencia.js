"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAsistenciaUseCaseImpl = void 0;
class CreateAsistenciaUseCaseImpl {
    constructor(asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }
    execute(asistencia) {
        return this.asistenciaRepository.createAsistencia(asistencia);
    }
}
exports.CreateAsistenciaUseCaseImpl = CreateAsistenciaUseCaseImpl;
//# sourceMappingURL=create-asistencia.js.map