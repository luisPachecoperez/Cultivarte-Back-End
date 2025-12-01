"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesionesResolvers = exports.controller = void 0;
const domain_1 = require("../../domain");
const sesiones_datasource_impl_1 = require("../../infrastructure/datasource/sesiones-datasource-impl");
const sesiones_repository_impl_1 = require("../../infrastructure/repositories/sesiones-repository-impl");
const get_sesiones_1 = require("../../domain/use-cases/sesiones/get-sesiones");
const sesiones_controller_1 = require("../../aplication/controller/sesiones-controller");
const dataSource = new sesiones_datasource_impl_1.SesionesDataSourceImpl();
const repository = new sesiones_repository_impl_1.SesionesRepositoryImpl(dataSource);
const useCaseGetById = new domain_1.GetSesionUseCaseImpl(repository);
const useCaseCreate = new domain_1.CreateSesionUseCaseImpl(repository);
const useCaseUpdate = new domain_1.UpdateSesionUseCaseImpl(repository);
const useCaseDelete = new domain_1.DeleteSesionUseCaseImpl(repository);
const useCaseGetAll = new get_sesiones_1.GetSesionesUseCaseImpl(repository);
const useCaseGetSesionesSede = new domain_1.GetSesionesSedesUseCaseImpl(repository);
const useCaseUpdateSesiones = new domain_1.UpdateSesionesUseCaseImpl(repository);
exports.controller = new sesiones_controller_1.SesionesController(useCaseGetAll, useCaseGetById, useCaseGetSesionesSede, useCaseCreate, useCaseUpdate, useCaseDelete, useCaseUpdateSesiones);
exports.sesionesResolvers = {
    Query: {
        getSesiones: (_, args) => exports.controller.getSesiones(args.limit, args.offset),
        getSesion: (_, args) => exports.controller.getSesion(args.id_sesion),
        getSesionesSedes: (_, args) => exports.controller.getSesionesSedes(args.id_usuario, args.fecha_inicio, args.fecha_fin),
    },
    Mutation: {
        createSesion: (_, args) => exports.controller.createSesion(args.input),
        updateSesion: (_, args) => exports.controller.updateSesion(args.input.id_sesion, args.input),
        deleteSesion: (_, args) => exports.controller.deleteSesion(args.id_sesion),
        updateSesiones: (_, args) => exports.controller.updateSesiones(args.input),
    },
};
//# sourceMappingURL=sesiones-resolver.js.map