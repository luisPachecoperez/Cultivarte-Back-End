import {
  GetPersonaProgramaUseCaseImpl,
  PersonaPrograma,
  DeletePersonaProgramaUseCaseImpl,
  GetPersonasProgramaUseCaseImpl,
  CreatePersonaProgramaUseCaseImpl,
  UpdatePersonaProgramaUseCaseImpl,
} from '../../domain';
import { PersonasProgramaDataSourceImpl } from '../../infrastructure/datasource/personas-programa-datasource-impl';
import { PersonasProgramaRepositoryImpl } from '../../infrastructure/repositories/personas-programa-repository-impl';
import { PersonasProgramaController } from '../../aplication/controller/personas-programa-controller';

const dataSource = new PersonasProgramaDataSourceImpl();
const repository = new PersonasProgramaRepositoryImpl(dataSource);
const useCaseGetById = new GetPersonaProgramaUseCaseImpl(repository);

const useCaseGetAll = new GetPersonasProgramaUseCaseImpl(repository);
const useCaseCreate = new CreatePersonaProgramaUseCaseImpl(repository);
const useCaseUpdate = new UpdatePersonaProgramaUseCaseImpl(repository);
const useCaseDelete = new DeletePersonaProgramaUseCaseImpl(repository);
const controller = new PersonasProgramaController(
  useCaseCreate,
  useCaseUpdate,
  useCaseDelete,
  useCaseGetById,
  useCaseGetAll,
);

export const personasProgramaResolvers = {
  Query: {
    getPersonaProgramaById: (
      _parent: unknown,
      args: { id_persona_programa: string },
    ) => controller.getPersonaPrograma(args.id_persona_programa),
    getPersonaProgramas: () => controller.getPersonasPrograma(),
  },
  Mutation: {
    createPersonaPrograma: (
      _parent: unknown,
      args: { personaPrograma: PersonaPrograma },
    ) => controller.createPersonaPrograma(args.personaPrograma),
    updatePersonaPrograma: (
      _parent: unknown,
      args: { id_persona_programa: string; personaPrograma: PersonaPrograma },
    ) =>
      controller.updatePersonaPrograma(
        args.id_persona_programa,
        args.personaPrograma,
      ),
    deletePersonaPrograma: (
      _parent: unknown,
      args: { id_persona_programa: string },
    ) => controller.deletePersonaPrograma(args.id_persona_programa),
  },
};
