import { PersonasGrupoInteresDataSourceImpl } from "../../infrastructure/datasource/personas-grupo-interes-datasource-impl";
import { PersonasGrupoInteresRepositoryImpl } from "../../infrastructure/repositories/personas-grupo-interes-repository-impl";
import { PersonasGruposInteresController } from "../../aplication/controller/personas-grupos-interes-controller";
import {
  GetPersonasGrupoInteresUseCaseImpl,
  GetPersonaGrupoInteresUseCaseImpl,
  CreatePersonaGrupoInteresUseCaseImpl,
  UpdatePersonaGrupoInteresUseCaseImpl,
  DeletePersonaGrupoInteresUseCaseImpl,
  PersonaGrupoInteres,
} from "../../domain";

const dataSource = new PersonasGrupoInteresDataSourceImpl();
const repository = new PersonasGrupoInteresRepositoryImpl(dataSource);
const useCaseGetById = new GetPersonaGrupoInteresUseCaseImpl(repository);
const useCaseGetAll = new GetPersonasGrupoInteresUseCaseImpl(repository);
const useCaseCreate = new CreatePersonaGrupoInteresUseCaseImpl(repository);
const useCaseUpdate = new UpdatePersonaGrupoInteresUseCaseImpl(repository);
const useCaseDelete = new DeletePersonaGrupoInteresUseCaseImpl(repository);
const controller = new PersonasGruposInteresController(
  useCaseGetById,
  useCaseGetAll,
  useCaseCreate,
  useCaseUpdate,
  useCaseDelete,
);

export const personasGrupoInteresResolvers = {
  Query: {
    getPersonaGrupoInteresById: (
      _parent: unknown,
      args: { id_persona_grupo_interes: string },
    ) => controller.getPersonaGrupoInteresById(args.id_persona_grupo_interes),
    getPersonasGrupoInteres: () => controller.getPersonasGrupoInteres(),
  },
  Mutation: {
    createPersonaGrupoInteres: (
      _parent: unknown,
      args: { personaGrupoInteres: PersonaGrupoInteres },
    ) => controller.createPersonaGrupoInteres(args.personaGrupoInteres),
    updatePersonaGrupoInteres: (
      _parent: unknown,
      args: {
        id_persona_grupo_interes: string;
        personaGrupoInteres: PersonaGrupoInteres;
      },
    ) =>
      controller.updatePersonaGrupoInteres(
        args.id_persona_grupo_interes,
        args.personaGrupoInteres,
      ),
    deletePersonaGrupoInteres: (
      _parent: unknown,
      args: { id_persona_grupo_interes: string },
    ) => controller.deletePersonaGrupoInteres(args.id_persona_grupo_interes),
  },
};
