"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParametrosDetalleUseCaseImpl = void 0;
class GetParametrosDetalleUseCaseImpl {
    constructor(parametroDetalleRepository) {
        this.parametroDetalleRepository = parametroDetalleRepository;
    }
    execute() {
        return this.parametroDetalleRepository.getAll();
    }
}
exports.GetParametrosDetalleUseCaseImpl = GetParametrosDetalleUseCaseImpl;
//# sourceMappingURL=get-parametros-detalle.js.map