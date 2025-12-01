"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsistenciasController = void 0;
class AsistenciasController {
    constructor(getAsistenciasUseCase, getAsistenciaUseCase, getAsistenciasSedeUseCase, getPreAsistenciaUseCase, createAsistenciaUseCase, updateAsistenciaUseCase, updateAsistenciasUseCase, deleteAsistenciaUseCase) {
        this.getAsistenciasUseCase = getAsistenciasUseCase;
        this.getAsistenciaUseCase = getAsistenciaUseCase;
        this.getAsistenciasSedeUseCase = getAsistenciasSedeUseCase;
        this.getPreAsistenciaUseCase = getPreAsistenciaUseCase;
        this.createAsistenciaUseCase = createAsistenciaUseCase;
        this.updateAsistenciaUseCase = updateAsistenciaUseCase;
        this.updateAsistenciasUseCase = updateAsistenciasUseCase;
        this.deleteAsistenciaUseCase = deleteAsistenciaUseCase;
    }
    async getAsistencias() {
        return this.getAsistenciasUseCase.execute();
    }
    async getAsistencia(id_asistencia) {
        return this.getAsistenciaUseCase.execute(id_asistencia);
    }
    async getAsistenciasSede(id_usuario, fecha_inicio, fecha_fin) {
        return this.getAsistenciasSedeUseCase.execute(id_usuario, fecha_inicio, fecha_fin);
    }
    async getPreAsistencia(id_sesion) {
        return this.getPreAsistenciaUseCase.execute(id_sesion);
    }
    async createAsistencia(asistencia) {
        return this.createAsistenciaUseCase.execute(asistencia);
    }
    async updateAsistencia(id_asistencia, asistencia) {
        return this.updateAsistenciaUseCase.execute(id_asistencia, asistencia);
    }
    async updateAsistencias(asistenciaSesiones) {
        return this.updateAsistenciasUseCase.execute(asistenciaSesiones);
    }
    async deleteAsistencia(id_asistencia) {
        return this.deleteAsistenciaUseCase.execute(id_asistencia);
    }
}
exports.AsistenciasController = AsistenciasController;
//# sourceMappingURL=asistencia-controller.js.map