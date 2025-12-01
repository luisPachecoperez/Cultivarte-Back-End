"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateParametroDetalleUseCaseImpl = void 0;
class CreateParametroDetalleUseCaseImpl {
    constructor(parametroDetalleRepository) {
        this.parametroDetalleRepository = parametroDetalleRepository;
    }
    execute(parametroDetalle) {
        return this.parametroDetalleRepository.create(parametroDetalle);
    }
}
exports.CreateParametroDetalleUseCaseImpl = CreateParametroDetalleUseCaseImpl;
//# sourceMappingURL=create-parametro-detalle.js.map