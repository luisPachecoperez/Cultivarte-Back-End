"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asistenciasResolvers = void 0;
const domain_1 = require("../../domain");
const asistencia_controller_1 = require("./../../aplication/controller/asistencia-controller");
const asistencias_datasource_impl_1 = require("../../infrastructure/datasource/asistencias-datasource-impl");
const asistencia_respository_impl_1 = require("../../infrastructure/repositories/asistencia-respository-impl");
const datasource = new asistencias_datasource_impl_1.AsistenciaDataSourceImpl();
const repository = new asistencia_respository_impl_1.AsistenciaRepositoryImpl(datasource);
const getAsistenciasUseCase = new domain_1.GetAsistenciasUseCaseImpl(repository);
const getAsistenciaUseCase = new domain_1.GetAsistenciaUseCaseImpl(repository);
const getAsistenciasSedeUseCase = new domain_1.GetAsistenciasSedeUseCaseImpl(repository);
const createAsistenciaUseCase = new domain_1.CreateAsistenciaUseCaseImpl(repository);
const updateAsistenciaUseCase = new domain_1.UpdateAsistenciaUseCaseImpl(repository);
const updateAsistenciasUseCase = new domain_1.UpdateAsistenciasUseCaseImpl(repository);
const deleteAsistenciaUseCase = new domain_1.DeleteAsistenciaUseCaseImpl(repository);
const getPreAsistenciaUseCase = new domain_1.GetPreAsistenciaUseCaseImpl(repository);
const controller = new asistencia_controller_1.AsistenciasController(getAsistenciasUseCase, getAsistenciaUseCase, getAsistenciasSedeUseCase, getPreAsistenciaUseCase, createAsistenciaUseCase, updateAsistenciaUseCase, updateAsistenciasUseCase, deleteAsistenciaUseCase);
exports.asistenciasResolvers = {
    Query: {
        getAsistencias: () => controller.getAsistencias(),
        getAsistencia: (_, args) => controller.getAsistencia(args.id),
        getPreAsistencia: (_, args) => controller.getPreAsistencia(args.id_sesion),
        getAsistenciasSede: (_, args) => controller.getAsistenciasSede(args.id_usuario, args.fecha_inicio, args.fecha_fin),
    },
    Mutation: {
        createAsistencia: (_, args) => controller.createAsistencia(args.data),
        updateAsistencia: (_, args) => controller.updateAsistencia(args.id, args.data),
        deleteAsistencia: (_, args) => controller.deleteAsistencia(args.id),
        updateAsistencias: (_, args) => controller.updateAsistencias(args.input),
    },
};
//# sourceMappingURL=asistencias-resolvers.js.map