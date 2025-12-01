"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsistenciaRepositoryImpl = void 0;
class AsistenciaRepositoryImpl {
    constructor(asistenciaDataSource) {
        this.asistenciaDataSource = asistenciaDataSource;
    }
    getAll() {
        return this.asistenciaDataSource.getAll();
    }
    getById(id_asistencia) {
        return this.asistenciaDataSource.getById(id_asistencia);
    }
    getAsistenciasSede(id_usuario, fecha_inicio, fecha_fin) {
        return this.asistenciaDataSource.getAsistenciasSede(id_usuario, fecha_inicio, fecha_fin);
    }
    createAsistencia(asistencia) {
        return this.asistenciaDataSource.createAsistencia(asistencia);
    }
    updateAsistencias(asistenciaSesiones) {
        return this.asistenciaDataSource.updateAsistencias(asistenciaSesiones);
    }
    updateById(id_asistencia, asistencia) {
        return this.asistenciaDataSource.updateById(id_asistencia, asistencia);
    }
    deleteById(id_asistencia) {
        return this.asistenciaDataSource.deleteById(id_asistencia);
    }
    getPreAsistencia(id_sesion) {
        return this.asistenciaDataSource.getPreAsistencia(id_sesion);
    }
}
exports.AsistenciaRepositoryImpl = AsistenciaRepositoryImpl;
//# sourceMappingURL=asistencia-respository-impl.js.map