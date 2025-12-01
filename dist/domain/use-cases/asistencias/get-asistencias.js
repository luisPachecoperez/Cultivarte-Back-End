"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAsistenciasUseCaseImpl = void 0;
class GetAsistenciasUseCaseImpl {
    constructor(asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }
    execute() {
        return this.asistenciaRepository.getAll();
    }
}
exports.GetAsistenciasUseCaseImpl = GetAsistenciasUseCaseImpl;
//# sourceMappingURL=get-asistencias.js.map