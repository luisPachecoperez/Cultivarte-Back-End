export { controller };
import { PoblacionDataSourceImpl } from './../../infrastructure/datasource/poblaciones-datasource-impl';
import {
  CreatePoblacionUseCaseImpl,
  UpdatePoblacionUseCaseImpl,
  DeletePoblacionUseCaseImpl,
  GetPoblacionesUseCaseImpl,
  GetPoblacionUseCaseImpl,
  Poblacion,
} from '../../domain';
import { PoblacionRepositoryImpl } from '../../infrastructure/repositories/poblacion-repository-impl';
import { PoblacionesController } from '../../aplication/controller/poblaciones-controller';

const dataSource = new PoblacionDataSourceImpl();
const repository = new PoblacionRepositoryImpl(dataSource);
const createPoblacionUseCase = new CreatePoblacionUseCaseImpl(repository);
const updatePoblacionUseCase = new UpdatePoblacionUseCaseImpl(repository);
const deletePoblacionUseCase = new DeletePoblacionUseCaseImpl(repository);
const getPoblacionesUseCase = new GetPoblacionesUseCaseImpl(repository);
const getPoblacionUseCase = new GetPoblacionUseCaseImpl(repository);

const controller = new PoblacionesController(
  getPoblacionesUseCase,
  getPoblacionUseCase,
  createPoblacionUseCase,
  updatePoblacionUseCase,
  deletePoblacionUseCase,
);

export const poblacionesResolvers = {
  Query: {
    getPoblaciones: () => controller.getPoblaciones(),
    getPoblacion: async (
      _: any,
      { id_poblacion }: { id_poblacion: string },
    ) => {
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
    createPoblacion: (_: any, args: { input: Poblacion }) =>
      controller.createPoblacion(args.input),
    updatePoblacion: (_: any, args: { id: string; input: Poblacion }) =>
      controller.updatePoblacion(args.id, args.input),
    deletePoblacion: (_: any, args: { id: string }) =>
      controller.deletePoblacion(args.id),
  },
};
