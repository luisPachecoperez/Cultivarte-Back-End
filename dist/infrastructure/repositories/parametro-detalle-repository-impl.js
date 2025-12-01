"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametroDetalleRepositoryImpl = void 0;
class ParametroDetalleRepositoryImpl {
    constructor(parametroDetalleDataSource) {
        this.parametroDetalleDataSource = parametroDetalleDataSource;
    }
    getAll() {
        return this.parametroDetalleDataSource.getAll();
    }
    getById(id_parametro_detalle) {
        return this.parametroDetalleDataSource.getById(id_parametro_detalle);
    }
    create(parametroDetalle) {
        return this.parametroDetalleDataSource.create(parametroDetalle);
    }
    updateById(id_parametro_detalle, parametroDetalle) {
        return this.parametroDetalleDataSource.updateById(id_parametro_detalle, parametroDetalle);
    }
    deleteById(id_parametro_detalle) {
        return this.parametroDetalleDataSource.deleteById(id_parametro_detalle);
    }
}
exports.ParametroDetalleRepositoryImpl = ParametroDetalleRepositoryImpl;
//# sourceMappingURL=parametro-detalle-repository-impl.js.map