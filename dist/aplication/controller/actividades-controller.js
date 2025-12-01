"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActividadesController = void 0;
class ActividadesController {
    constructor(getPreCreateActividadUseCase, getPreEditActividadUseCase, getActividadesUseCase, getActividadUseCase, getActividadSedesUseCase, createActividadAndSesionesUseCase, createActividadUseCase, updateActividadUseCase, deleteActividadUseCase) {
        this.getPreCreateActividadUseCase = getPreCreateActividadUseCase;
        this.getPreEditActividadUseCase = getPreEditActividadUseCase;
        this.getActividadesUseCase = getActividadesUseCase;
        this.getActividadUseCase = getActividadUseCase;
        this.getActividadSedesUseCase = getActividadSedesUseCase;
        this.createActividadAndSesionesUseCase = createActividadAndSesionesUseCase;
        this.createActividadUseCase = createActividadUseCase;
        this.updateActividadUseCase = updateActividadUseCase;
        this.deleteActividadUseCase = deleteActividadUseCase;
    }
    async getPreCreateActividad(id_usuario) {
        return this.getPreCreateActividadUseCase.execute(id_usuario);
    }
    async getPreEditActividad(id_actividad, id_usuario) {
        return this.getPreEditActividadUseCase.execute(id_actividad, id_usuario);
    }
    async getActividades(limit, offset) {
        return this.getActividadesUseCase.execute(limit, offset);
    }
    async getActividad(id_actividad) {
        return this.getActividadUseCase.execute(id_actividad);
    }
    async getActividadSedes(id_usuario, fecha_inicio, fecha_fin) {
        return this.getActividadSedesUseCase.execute(id_usuario, fecha_inicio, fecha_fin);
    }
    async createActividadAndSesiones(actividad) {
        return this.createActividadAndSesionesUseCase.execute(actividad);
    }
    async createActividad(actividad) {
        return this.createActividadUseCase.execute(actividad);
    }
    async updateActividad(id_actividad, actividad) {
        return this.updateActividadUseCase.execute(id_actividad, actividad);
    }
    async deleteActividad(id_actividad) {
        return this.deleteActividadUseCase.execute(id_actividad);
    }
}
exports.ActividadesController = ActividadesController;
//# sourceMappingURL=actividades-controller.js.map