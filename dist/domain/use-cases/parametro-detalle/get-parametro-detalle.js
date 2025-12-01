"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParametroDetalleUseCaseImpl = void 0;
class GetParametroDetalleUseCaseImpl {
    constructor(parametroDetalleRepository) {
        this.parametroDetalleRepository = parametroDetalleRepository;
    }
    execute(id_parametro_detalle) {
        return this.parametroDetalleRepository.getById(id_parametro_detalle);
    }
}
exports.GetParametroDetalleUseCaseImpl = GetParametroDetalleUseCaseImpl;
//# sourceMappingURL=get-parametro-detalle.js.map