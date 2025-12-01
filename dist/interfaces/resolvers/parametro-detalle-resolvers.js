"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametroDetalleResolvers = void 0;
const domain_1 = require("../../domain");
const parametro_detalle_datasource_impl_1 = require("../../infrastructure/datasource/parametro-detalle-datasource-impl");
const parametro_detalle_repository_impl_1 = require("../../infrastructure/repositories/parametro-detalle-repository-impl");
const parametros_detalle_controller_1 = require("../../aplication/controller/parametros-detalle-controller");
const dataSource = new parametro_detalle_datasource_impl_1.ParametroDetalleDataSourceImpl();
const repository = new parametro_detalle_repository_impl_1.ParametroDetalleRepositoryImpl(dataSource);
const useCaseGetById = new domain_1.GetParametroDetalleUseCaseImpl(repository);
const useCaseGetAll = new domain_1.GetParametrosDetalleUseCaseImpl(repository);
const useCaseCreate = new domain_1.CreateParametroDetalleUseCaseImpl(repository);
const useCaseUpdate = new domain_1.UpdateParametroDetalleUseCaseImpl(repository);
const useCaseDelete = new domain_1.DeleteParametroDetalleUseCaseImpl(repository);
const controller = new parametros_detalle_controller_1.ParametrosDetalleController(useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete);
exports.parametroDetalleResolvers = {
    Query: {
        getParametrosDetalle: () => controller.getParametrosDetalle(),
        getParametroDetalle: (_, args) => controller.getParametroDetalle(args.id),
    },
    Mutation: {
        createParametroDetalle: (_, args) => controller.createParametroDetalle(args.data),
        updateParametroDetalle: (_, args) => controller.updateParametroDetalle(args.id, args.data),
        deleteParametroDetalle: (_, args) => controller.deleteParametroDetalle(args.id),
    },
};
//# sourceMappingURL=parametro-detalle-resolvers.js.map