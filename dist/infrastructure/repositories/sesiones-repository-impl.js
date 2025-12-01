"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionesRepositoryImpl = void 0;
class SesionesRepositoryImpl {
    constructor(sesionesDataSource) {
        this.sesionesDataSource = sesionesDataSource;
    }
    async getAll(limit, offset) {
        return this.sesionesDataSource.getAll(limit, offset);
    }
    async getById(id_sesion) {
        return this.sesionesDataSource.getById(id_sesion);
    }
    async getSesionesSede(id_usuario, fecha_inicio, fecha_fin) {
        return this.sesionesDataSource.getSesionesSede(id_usuario, fecha_inicio, fecha_fin);
    }
    async createSesion(sesion) {
        return this.sesionesDataSource.createSesion(sesion);
    }
    async updateById(id_sesion, sesion) {
        return this.sesionesDataSource.updateById(id_sesion, sesion);
    }
    async deleteById(id_sesion) {
        return this.sesionesDataSource.deleteById(id_sesion);
    }
    async updateSesiones(editarSesiones) {
        return this.sesionesDataSource.updateSesiones(editarSesiones);
    }
}
exports.SesionesRepositoryImpl = SesionesRepositoryImpl;
//# sourceMappingURL=sesiones-repository-impl.js.map