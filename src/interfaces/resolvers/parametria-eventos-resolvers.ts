import { ParametriaEventosDataSourceImpl } from '../../infrastructure/datasource/parametria-eventos-impl';
import { ParametriaEventosRepositoryImpl } from '../../infrastructure/repositories/parametria-eventos-impl';
import { GetParametriaEventosUseCaseImpl } from '../../domain';
import { ParametriaEventosController } from '../../aplication/controller/parametria-eventos-controller';

const dataSource = new ParametriaEventosDataSourceImpl();
const repository = new ParametriaEventosRepositoryImpl(dataSource);
const useCaseGetAll = new GetParametriaEventosUseCaseImpl(repository);
const controller = new ParametriaEventosController(useCaseGetAll);

export const parametriaEventosResolvers = {
  Query: {
    getParametriaEventos: () => controller.getAll(),
  },
};
