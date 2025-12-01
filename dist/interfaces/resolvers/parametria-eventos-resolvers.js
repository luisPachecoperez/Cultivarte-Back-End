"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametriaEventosResolvers = void 0;
const parametria_eventos_impl_1 = require("../../infrastructure/datasource/parametria-eventos-impl");
const parametria_eventos_impl_2 = require("../../infrastructure/repositories/parametria-eventos-impl");
const domain_1 = require("../../domain");
const parametria_eventos_controller_1 = require("../../aplication/controller/parametria-eventos-controller");
const dataSource = new parametria_eventos_impl_1.ParametriaEventosDataSourceImpl();
const repository = new parametria_eventos_impl_2.ParametriaEventosRepositoryImpl(dataSource);
const useCaseGetAll = new domain_1.GetParametriaEventosUseCaseImpl(repository);
const controller = new parametria_eventos_controller_1.ParametriaEventosController(useCaseGetAll);
exports.parametriaEventosResolvers = {
    Query: {
        getParametriaEventos: () => controller.getAll(),
    },
};
//# sourceMappingURL=parametria-eventos-resolvers.js.map