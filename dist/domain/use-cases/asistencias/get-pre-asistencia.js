"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPreAsistenciaUseCaseImpl = void 0;
class GetPreAsistenciaUseCaseImpl {
    constructor(asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }
    execute(id_sesion) {
        return this.asistenciaRepository.getPreAsistencia(id_sesion);
    }
}
exports.GetPreAsistenciaUseCaseImpl = GetPreAsistenciaUseCaseImpl;
//# sourceMappingURL=get-pre-asistencia.js.map