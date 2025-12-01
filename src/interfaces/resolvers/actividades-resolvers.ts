import {
  GetActividadesUseCaseImpl,
  GetPreCreateActividadUseCaseImpl,
  DeleteActividadUseCaseImpl,
  UpdateActividadUseCaseImpl,
  CreateActividadUseCaseImpl,
  GetActividadUseCaseImpl,
  Actividad,
  CreateActividadAndSesionesUseCaseImpl,
  GetPreEditActividadUseCaseImpl,
  GetActividadSedesUseCaseImpl,
} from '../../domain';
import { ActividadesController } from '../../aplication/controller/actividades-controller';
import { ActividadRepositoryImpl } from '../../infrastructure/repositories/actividad-repository-impl';
import { ActividadDataSourceImpl } from '../../infrastructure/datasource/actividad-datasource-impl';
import { ParametroDetalleRepositoryImpl } from '../../infrastructure/repositories/parametro-detalle-repository-impl';
import { ParametroDetalleDataSourceImpl } from '../../infrastructure/datasource/parametro-detalle-datasource-impl';

const parametroDetalleDataSource = new ParametroDetalleDataSourceImpl();
const actividadDataSource = new ActividadDataSourceImpl();
const actividadRepository = new ActividadRepositoryImpl(actividadDataSource);
const parametroDetalleRepository = new ParametroDetalleRepositoryImpl(
  parametroDetalleDataSource,
);
const getActividadesUseCase = new GetActividadesUseCaseImpl(
  actividadRepository,
);
const getActividadUseCase = new GetActividadUseCaseImpl(actividadRepository);
const createActividadAndSesionesUseCase =
  new CreateActividadAndSesionesUseCaseImpl(
    actividadRepository,
    parametroDetalleRepository,
  );
const getActividadSedesUseCase = new GetActividadSedesUseCaseImpl(
  actividadRepository,
);
const createActividadUseCase = new CreateActividadUseCaseImpl(
  actividadRepository,
);
const updateActividadUseCase = new UpdateActividadUseCaseImpl(
  actividadRepository,
);
const deleteActividadUseCase = new DeleteActividadUseCaseImpl(
  actividadRepository,
);
const getPreCreateActividadUseCase = new GetPreCreateActividadUseCaseImpl(
  actividadRepository,
);
const getPreEditActividadUseCase = new GetPreEditActividadUseCaseImpl(
  actividadRepository,
);
const controller = new ActividadesController(
  getPreCreateActividadUseCase,
  getPreEditActividadUseCase,
  getActividadesUseCase,
  getActividadUseCase,
  getActividadSedesUseCase,
  createActividadAndSesionesUseCase,
  createActividadUseCase,
  updateActividadUseCase,
  deleteActividadUseCase,
);

export const actividadesResolvers = {
  Query: {
    getActividades: (_: any, args: { limit: number; offset: number }) =>
      controller.getActividades(args.limit, args.offset),
    getActividad: (_: any, args: { id: string }) =>
      controller.getActividad(args.id),
    getPreCreateActividad: (_: any, args: { id_usuario: string }) =>
      controller.getPreCreateActividad(args.id_usuario),
    getPreEditActividad: (
      _: any,
      args: { id_actividad: string; id_usuario: string },
    ) => controller.getPreEditActividad(args.id_actividad, args.id_usuario),
    getActividadSedes: async (
      _: any,
      args: { id_usuario: string; fecha_inicio: string; fecha_fin: string },
    ) => {
      try {
        const result = await controller.getActividadSedes(
          args.id_usuario,
          args.fecha_inicio,
          args.fecha_fin,
        );
        if (result && 'exitoso' in result && result.exitoso === 'N') {
          throw new Error(result.mensaje);
        }
        return result;
      } catch (error) {
        return {
          exitoso: 'N',
          mensaje:
            error instanceof Error ? error.message : JSON.stringify(error),
        };
      }
    },
  },
  Mutation: {
    createActividadAndSesiones: async (_: any, args: { data: Actividad }) => {
      try {
        return await controller.createActividadAndSesiones(args.data);
      } catch (error) {
        return {
          exitoso: 'N',
          mensaje:
            error instanceof Error ? error.message : JSON.stringify(error),
        };
      }
    },
    createActividad: (_: any, args: { data: Actividad }) =>
      controller.createActividad(args.data),
    updateActividad: async (
      _: any,
      args: { id_actividad: string; data: Actividad },
    ) => {
      try {
        return await controller.updateActividad(args.id_actividad, args.data);
      } catch (error) {
        return {
          exitoso: 'N',
          mensaje:
            error instanceof Error ? error.message : JSON.stringify(error),
        };
      }
    },
    deleteActividad: (_: any, args: { id_actividad: string }) =>
      controller.deleteActividad(args.id_actividad),
  },
};
export { controller };
