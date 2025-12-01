"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAsistenciasSedeUseCaseImpl = void 0;
class GetAsistenciasSedeUseCaseImpl {
    constructor(asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }
    execute(id_usuario, fecha_inicio, fecha_fin) {
        return this.asistenciaRepository.getAsistenciasSede(id_usuario, fecha_inicio, fecha_fin);
    }
}
exports.GetAsistenciasSedeUseCaseImpl = GetAsistenciasSedeUseCaseImpl;
//# sourceMappingURL=get-asistencia-sede.js.map