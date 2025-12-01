"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteParametroDetalleUseCaseImpl = void 0;
class DeleteParametroDetalleUseCaseImpl {
    constructor(parametroDetalleRepository) {
        this.parametroDetalleRepository = parametroDetalleRepository;
    }
    execute(id_parametro_detalle) {
        return this.parametroDetalleRepository.deleteById(id_parametro_detalle);
    }
}
exports.DeleteParametroDetalleUseCaseImpl = DeleteParametroDetalleUseCaseImpl;
//# sourceMappingURL=delete-paramtero-detalle.js.map