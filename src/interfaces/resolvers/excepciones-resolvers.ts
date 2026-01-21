import { ExcepcionesController } from '../../aplication/controller/excepciones-controller';
import {
  EditarExcepciones,
  GetExcepcionesUseCaseImpl,
  PersistExcepcionUseCaseImpl,
} from '../../domain';

import { ExcepcionesDataSourceImpl } from '../../infrastructure/datasource/excepciones-datasource-impl';
import { ExcepcionesRepositoryImpl } from '../../infrastructure/repositories/excepciones-repository-impl';

const datasource = new ExcepcionesDataSourceImpl();
const repository = new ExcepcionesRepositoryImpl(datasource);

const getExcepcionesUseCase = new GetExcepcionesUseCaseImpl(repository);
const persistExcepcionUseCase = new PersistExcepcionUseCaseImpl(repository);

const excepcionesController = new ExcepcionesController(
  getExcepcionesUseCase,
  persistExcepcionUseCase,
);

export const buildExcepcionesResolvers = (
  controller: ExcepcionesController = excepcionesController,
) => ({
  Query: {
    GetExcepciones: async () => {
      try {
        return await controller.getExcepciones();
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
    UpdateExcepciones: async (_: any, args: { input: EditarExcepciones }) => {
      try {
        return await controller.persistExcepcion(args.input);
      } catch (error) {
        return {
          exitoso: 'N',
          mensaje:
            error instanceof Error ? error.message : JSON.stringify(error),
        };
      }
    },
  },
});

export const excepcionesResolvers = buildExcepcionesResolvers();
