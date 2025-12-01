"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poblacionesResolvers = exports.controller = void 0;
const poblaciones_datasource_impl_1 = require("./../../infrastructure/datasource/poblaciones-datasource-impl");
const domain_1 = require("../../domain");
const poblacion_repository_impl_1 = require("../../infrastructure/repositories/poblacion-repository-impl");
const poblaciones_controller_1 = require("../../aplication/controller/poblaciones-controller");
const dataSource = new poblaciones_datasource_impl_1.PoblacionDataSourceImpl();
const repository = new poblacion_repository_impl_1.PoblacionRepositoryImpl(dataSource);
const createPoblacionUseCase = new domain_1.CreatePoblacionUseCaseImpl(repository);
const updatePoblacionUseCase = new domain_1.UpdatePoblacionUseCaseImpl(repository);
const deletePoblacionUseCase = new domain_1.DeletePoblacionUseCaseImpl(repository);
const getPoblacionesUseCase = new domain_1.GetPoblacionesUseCaseImpl(repository);
const getPoblacionUseCase = new domain_1.GetPoblacionUseCaseImpl(repository);
const controller = new poblaciones_controller_1.PoblacionesController(getPoblacionesUseCase, getPoblacionUseCase, createPoblacionUseCase, updatePoblacionUseCase, deletePoblacionUseCase);
exports.controller = controller;
exports.poblacionesResolvers = {
    Query: {
        getPoblaciones: () => controller.getPoblaciones(),
        getPoblacion: async (_, { id_poblacion }) => {
            const result = await controller.getPoblacion(id_poblacion);
            if (result && 'exitoso' in result && result.exitoso === 'N') {
                throw new Error(result.mensaje);
            }
            if (!result) {
                throw new Error('No se encontró la población solicitada');
            }
            return result;
        },
    },
    Mutation: {
        createPoblacion: (_, args) => controller.createPoblacion(args.input),
        updatePoblacion: (_, args) => controller.updatePoblacion(args.id, args.input),
        deletePoblacion: (_, args) => controller.deletePoblacion(args.id),
    },
};
//# sourceMappingURL=poblaciones-resolvers.js.map