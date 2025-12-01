"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametrosGeneralesController = void 0;
class ParametrosGeneralesController {
    constructor(createParametroGeneralUseCase, getParametrosGeneralesUseCase, getParametroGeneralUseCase, updateParametroGeneralUseCase, deleteParametroGeneralUseCase) {
        this.createParametroGeneralUseCase = createParametroGeneralUseCase;
        this.getParametrosGeneralesUseCase = getParametrosGeneralesUseCase;
        this.getParametroGeneralUseCase = getParametroGeneralUseCase;
        this.updateParametroGeneralUseCase = updateParametroGeneralUseCase;
        this.deleteParametroGeneralUseCase = deleteParametroGeneralUseCase;
    }
    async createParametroGeneral(parametroGeneral) {
        return this.createParametroGeneralUseCase.execute(parametroGeneral);
    }
    async getParametrosGenerales() {
        return this.getParametrosGeneralesUseCase.execute();
    }
    async getParametroGeneral(id_parametro_general) {
        return this.getParametroGeneralUseCase.execute(id_parametro_general);
    }
    async updateParametroGeneral(id_parametro_general, parametroGeneral) {
        return this.updateParametroGeneralUseCase.execute(id_parametro_general, parametroGeneral);
    }
    async deleteParametroGeneral(id_parametro_general) {
        return this.deleteParametroGeneralUseCase.execute(id_parametro_general);
    }
}
exports.ParametrosGeneralesController = ParametrosGeneralesController;
//# sourceMappingURL=parametros-generales-controller.js.map