"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametrosGeneralesResolvers = void 0;
const domain_1 = require("../../domain");
const parametros_generales_datasource_impl_1 = require("../../infrastructure/datasource/parametros-generales-datasource-impl");
const parametros_generales_controller_1 = require("../../aplication/controller/parametros-generales-controller");
const parametros_generales_impl_1 = require("../../infrastructure/repositories/parametros-generales-impl");
const dataSource = new parametros_generales_datasource_impl_1.ParametrosGeneralesDataSourceImpl();
const repository = new parametros_generales_impl_1.ParametrosGeneralesRepositoryImpl(dataSource);
const useCaseGetById = new domain_1.GetParametroGeneralUseCaseImpl(repository);
const useCaseGetAll = new domain_1.GetParametrosGeneralesUseCaseImpl(repository);
const useCaseCreate = new domain_1.CreateParametroGeneralUseCaseImpl(repository);
const useCaseUpdate = new domain_1.UpdateParametroGeneralUseCaseImpl(repository);
const useCaseDelete = new domain_1.DeleteParametroGeneralUseCaseImpl(repository);
const controller = new parametros_generales_controller_1.ParametrosGeneralesController(useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete);
exports.parametrosGeneralesResolvers = {
    Query: {
        getParametrosGenerales: () => controller.getParametrosGenerales(),
        getParametroGeneral: (_, args) => controller.getParametroGeneral(args.id),
    },
    Mutation: {
        createParametroGeneral: (_, args) => controller.createParametroGeneral(args.data),
        updateParametroGeneral: (_, args) => controller.updateParametroGeneral(args.id, args.data),
        deleteParametroGeneral: (_, args) => controller.deleteParametroGeneral(args.id),
    },
};
//# sourceMappingURL=parametros-generales-resolvers.js.map