import {
  GetParametroDetalleUseCaseImpl,
  GetParametrosDetalleUseCaseImpl,
  CreateParametroDetalleUseCaseImpl,
  UpdateParametroDetalleUseCaseImpl,
  DeleteParametroDetalleUseCaseImpl,
  ParametroDetalle,
} from '../../domain';
import { ParametroDetalleDataSourceImpl } from '../../infrastructure/datasource/parametro-detalle-datasource-impl';
import { ParametroDetalleRepositoryImpl } from '../../infrastructure/repositories/parametro-detalle-repository-impl';
import { ParametrosDetalleController } from '../../aplication/controller/parametros-detalle-controller';

const dataSource = new ParametroDetalleDataSourceImpl();
const repository = new ParametroDetalleRepositoryImpl(dataSource);
const useCaseGetById = new GetParametroDetalleUseCaseImpl(repository);
const useCaseGetAll = new GetParametrosDetalleUseCaseImpl(repository);
const useCaseCreate = new CreateParametroDetalleUseCaseImpl(repository);
const useCaseUpdate = new UpdateParametroDetalleUseCaseImpl(repository);
const useCaseDelete = new DeleteParametroDetalleUseCaseImpl(repository);
const controller = new ParametrosDetalleController(
  useCaseCreate,
  useCaseGetAll,
  useCaseGetById,
  useCaseUpdate,
  useCaseDelete,
);

export const parametroDetalleResolvers = {
  Query: {
    getParametrosDetalle: () => controller.getParametrosDetalle(),
    getParametroDetalle: (_: any, args: { id: string }) =>
      controller.getParametroDetalle(args.id),
  },
  Mutation: {
    createParametroDetalle: (_: any, args: { data: ParametroDetalle }) =>
      controller.createParametroDetalle(args.data),
    updateParametroDetalle: (
      _: any,
      args: { id: string; data: ParametroDetalle },
    ) => controller.updateParametroDetalle(args.id, args.data),
    deleteParametroDetalle: (_: any, args: { id: string }) =>
      controller.deleteParametroDetalle(args.id),
  },
};
