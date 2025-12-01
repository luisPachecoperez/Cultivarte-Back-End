"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.actividadesResolvers = void 0;
const domain_1 = require("../../domain");
const actividades_controller_1 = require("../../aplication/controller/actividades-controller");
const actividad_repository_impl_1 = require("../../infrastructure/repositories/actividad-repository-impl");
const actividad_datasource_impl_1 = require("../../infrastructure/datasource/actividad-datasource-impl");
const parametro_detalle_repository_impl_1 = require("../../infrastructure/repositories/parametro-detalle-repository-impl");
const parametro_detalle_datasource_impl_1 = require("../../infrastructure/datasource/parametro-detalle-datasource-impl");
const parametroDetalleDataSource = new parametro_detalle_datasource_impl_1.ParametroDetalleDataSourceImpl();
const actividadDataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
const actividadRepository = new actividad_repository_impl_1.ActividadRepositoryImpl(actividadDataSource);
const parametroDetalleRepository = new parametro_detalle_repository_impl_1.ParametroDetalleRepositoryImpl(parametroDetalleDataSource);
const getActividadesUseCase = new domain_1.GetActividadesUseCaseImpl(actividadRepository);
const getActividadUseCase = new domain_1.GetActividadUseCaseImpl(actividadRepository);
const createActividadAndSesionesUseCase = new domain_1.CreateActividadAndSesionesUseCaseImpl(actividadRepository, parametroDetalleRepository);
const getActividadSedesUseCase = new domain_1.GetActividadSedesUseCaseImpl(actividadRepository);
const createActividadUseCase = new domain_1.CreateActividadUseCaseImpl(actividadRepository);
const updateActividadUseCase = new domain_1.UpdateActividadUseCaseImpl(actividadRepository);
const deleteActividadUseCase = new domain_1.DeleteActividadUseCaseImpl(actividadRepository);
const getPreCreateActividadUseCase = new domain_1.GetPreCreateActividadUseCaseImpl(actividadRepository);
const getPreEditActividadUseCase = new domain_1.GetPreEditActividadUseCaseImpl(actividadRepository);
const controller = new actividades_controller_1.ActividadesController(getPreCreateActividadUseCase, getPreEditActividadUseCase, getActividadesUseCase, getActividadUseCase, getActividadSedesUseCase, createActividadAndSesionesUseCase, createActividadUseCase, updateActividadUseCase, deleteActividadUseCase);
exports.controller = controller;
exports.actividadesResolvers = {
    Query: {
        getActividades: (_, args) => controller.getActividades(args.limit, args.offset),
        getActividad: (_, args) => controller.getActividad(args.id),
        getPreCreateActividad: (_, args) => controller.getPreCreateActividad(args.id_usuario),
        getPreEditActividad: (_, args) => controller.getPreEditActividad(args.id_actividad, args.id_usuario),
        getActividadSedes: async (_, args) => {
            try {
                const result = await controller.getActividadSedes(args.id_usuario, args.fecha_inicio, args.fecha_fin);
                if (result && 'exitoso' in result && result.exitoso === 'N') {
                    throw new Error(result.mensaje);
                }
                return result;
            }
            catch (error) {
                return {
                    exitoso: 'N',
                    mensaje: error instanceof Error ? error.message : JSON.stringify(error),
                };
            }
        },
    },
    Mutation: {
        createActividadAndSesiones: async (_, args) => {
            try {
                return await controller.createActividadAndSesiones(args.data);
            }
            catch (error) {
                return {
                    exitoso: 'N',
                    mensaje: error instanceof Error ? error.message : JSON.stringify(error),
                };
            }
        },
        createActividad: (_, args) => controller.createActividad(args.data),
        updateActividad: async (_, args) => {
            try {
                return await controller.updateActividad(args.id_actividad, args.data);
            }
            catch (error) {
                return {
                    exitoso: 'N',
                    mensaje: error instanceof Error ? error.message : JSON.stringify(error),
                };
            }
        },
        deleteActividad: (_, args) => controller.deleteActividad(args.id_actividad),
    },
};
//# sourceMappingURL=actividades-resolvers.js.map