"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSesionesSedesUseCaseImpl = void 0;
class GetSesionesSedesUseCaseImpl {
    constructor(sesionesRepository) {
        this.sesionesRepository = sesionesRepository;
    }
    execute(id_usuario, fecha_inicio, fecha_fin) {
        return this.sesionesRepository.getSesionesSede(id_usuario, fecha_inicio, fecha_fin);
    }
}
exports.GetSesionesSedesUseCaseImpl = GetSesionesSedesUseCaseImpl;
//# sourceMappingURL=get-sesiones-sedes.js.map