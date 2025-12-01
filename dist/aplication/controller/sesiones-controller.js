"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionesController = void 0;
class SesionesController {
    constructor(getSesionesUseCase, getSesionUseCase, getSesionesSedesUseCase, createSesionUseCase, updateSesionUseCase, deleteSesionUseCase, updateSesionesUseCase) {
        this.getSesionesUseCase = getSesionesUseCase;
        this.getSesionUseCase = getSesionUseCase;
        this.getSesionesSedesUseCase = getSesionesSedesUseCase;
        this.createSesionUseCase = createSesionUseCase;
        this.updateSesionUseCase = updateSesionUseCase;
        this.deleteSesionUseCase = deleteSesionUseCase;
        this.updateSesionesUseCase = updateSesionesUseCase;
    }
    async getSesiones(limit, offset) {
        return this.getSesionesUseCase.execute(limit, offset);
    }
    async getSesion(id_sesion) {
        return this.getSesionUseCase.execute(id_sesion);
    }
    async getSesionesSedes(id_usuario, fecha_inicio, fecha_fin) {
        return this.getSesionesSedesUseCase.execute(id_usuario, fecha_inicio, fecha_fin);
    }
    async createSesion(sesion) {
        return this.createSesionUseCase.execute(sesion);
    }
    async updateSesion(id_sesion, sesion) {
        return this.updateSesionUseCase.execute(id_sesion, sesion);
    }
    async deleteSesion(id_sesion) {
        return this.deleteSesionUseCase.execute(id_sesion);
    }
    async updateSesiones(data) {
        return this.updateSesionesUseCase.execute(data);
    }
}
exports.SesionesController = SesionesController;
//# sourceMappingURL=sesiones-controller.js.map