import { SedeRepositoryImpl } from "../../infrastructure/repositories/sede-repository-impl";
import { GetSedesUseCaseImpl } from "../../domain/use-cases/sedes/get-sedes";
import { GetSedeUseCaseImpl } from "../../domain/use-cases/sedes/get-sede";
import { CreateSedeUseCaseImpl } from "../../domain/use-cases/sedes/create-sede";
import { UpdateSedeUseCaseImpl } from "../../domain/use-cases/sedes/update-sede";
import { DeleteSedeUseCaseImpl } from "../../domain/use-cases/sedes/delete-sede";
import { SedesController } from "../../aplication/controller/sedes-controller";
import { SedeDataSourceImpl } from "../../infrastructure/datasource/sede-datasource-impl";
import { Sede } from "../../domain";

const sedeDataSource = new SedeDataSourceImpl();
const sedeRepository = new SedeRepositoryImpl(sedeDataSource);
const getSedesUseCase = new GetSedesUseCaseImpl(sedeRepository);
const getSedeUseCase = new GetSedeUseCaseImpl(sedeRepository);
const createSedeUseCase = new CreateSedeUseCaseImpl(sedeRepository);
const updateSedeUseCase = new UpdateSedeUseCaseImpl(sedeRepository);
const deleteSedeUseCase = new DeleteSedeUseCaseImpl(sedeRepository);
const controller = new SedesController(
  getSedesUseCase,
  getSedeUseCase,
  createSedeUseCase,
  updateSedeUseCase,
  deleteSedeUseCase,
);

export const sedeResolvers = {
  Query: {
    getSedes: () => controller.getAll(),
    getSedeById: (_: any, args: { id_sede: string }) =>
      controller.getById(args.id_sede),
  },
  Mutation: {
    createSede: (_: any, args: { data: Sede }) => controller.create(args.data),
    updateSede: (_: any, args: { id_sede: string; data: Sede }) =>
      controller.update(args.id_sede, args.data),
    deleteSede: (_: any, args: { id_sede: string }) =>
      controller.delete(args.id_sede),
  },
};
