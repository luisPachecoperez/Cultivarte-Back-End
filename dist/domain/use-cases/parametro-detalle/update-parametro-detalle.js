"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParametroDetalleUseCaseImpl = void 0;
class UpdateParametroDetalleUseCaseImpl {
    constructor(parametroDetalleRepository) {
        this.parametroDetalleRepository = parametroDetalleRepository;
    }
    execute(id_parametro_detalle, parametroDetalle) {
        return this.parametroDetalleRepository.updateById(id_parametro_detalle, parametroDetalle);
    }
}
exports.UpdateParametroDetalleUseCaseImpl = UpdateParametroDetalleUseCaseImpl;
//# sourceMappingURL=update-parametro-detalle.js.map