"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametrosDetalleController = void 0;
class ParametrosDetalleController {
    constructor(createParametroDetalleUseCase, getParametrosDetalleUseCase, getParametroDetalleUseCase, updateParametroDetalleUseCase, deleteParametroDetalleUseCase) {
        this.createParametroDetalleUseCase = createParametroDetalleUseCase;
        this.getParametrosDetalleUseCase = getParametrosDetalleUseCase;
        this.getParametroDetalleUseCase = getParametroDetalleUseCase;
        this.updateParametroDetalleUseCase = updateParametroDetalleUseCase;
        this.deleteParametroDetalleUseCase = deleteParametroDetalleUseCase;
    }
    async createParametroDetalle(parametroDetalle) {
        return this.createParametroDetalleUseCase.execute(parametroDetalle);
    }
    async getParametrosDetalle() {
        return this.getParametrosDetalleUseCase.execute();
    }
    async getParametroDetalle(id_parametro_detalle) {
        return this.getParametroDetalleUseCase.execute(id_parametro_detalle);
    }
    async updateParametroDetalle(id_parametro_detalle, parametroDetalle) {
        return this.updateParametroDetalleUseCase.execute(id_parametro_detalle, parametroDetalle);
    }
    async deleteParametroDetalle(id_parametro_detalle) {
        return this.deleteParametroDetalleUseCase.execute(id_parametro_detalle);
    }
}
exports.ParametrosDetalleController = ParametrosDetalleController;
//# sourceMappingURL=parametros-detalle-controller.js.map