
import { GetPersonaSedeUseCaseImpl,
         GetPersonasSedesUseCaseImpl,
         CreatePersonaSedeUseCaseImpl,
         UpdatePersonaSedeUseCaseImpl,
         DeletePersonaSedeUseCaseImpl,
          } from '../../domain';

import { PersonasSedesDataSourceImpl } from '../../infrastructure/datasource/personas-sedes-datasource-impl';
import { PersonasSedesRepositoryImpl } from '../../infrastructure/repositories/personas-sedes-repository-impl';
import { PersonasSedesController } from '../../aplication/controller/personas-sedes-controller';
import { PersonaSede } from '../../domain/entities/persona-sede';

const personasSedesDataSource = new PersonasSedesDataSourceImpl();
const personasSedesRepository = new PersonasSedesRepositoryImpl(personasSedesDataSource);

const getPersonaSedeUseCase = new GetPersonaSedeUseCaseImpl(personasSedesRepository);
const getPersonasSedesUseCase = new GetPersonasSedesUseCaseImpl(personasSedesRepository);
const createPersonaSedeUseCase = new CreatePersonaSedeUseCaseImpl(personasSedesRepository);
const updatePersonaSedeUseCase = new UpdatePersonaSedeUseCaseImpl(personasSedesRepository);
const deletePersonaSedeUseCase = new DeletePersonaSedeUseCaseImpl(personasSedesRepository);

const controller = new PersonasSedesController(
    getPersonaSedeUseCase,
    getPersonasSedesUseCase,
    createPersonaSedeUseCase,
    updatePersonaSedeUseCase,
    deletePersonaSedeUseCase
);

export const personasSedesResolvers = {
    Query: {
        getPersonaSede: (parent: any, args: { id_sede: string }) => controller.getById(args.id_sede),
        getPersonasSedes: () => controller.getAll(),
    },
    Mutation: {
        createPersonaSede: (parent: any, args: { personaSede: PersonaSede }) => controller.create(args.personaSede),
        updatePersonaSede: (parent: any, args: { id_sede: string, personaSede: PersonaSede }) => controller.update(args.id_sede, args.personaSede),
        deletePersonaSede: (parent: any, args: { id_sede: string }) => controller.delete(args.id_sede),
    },
};
