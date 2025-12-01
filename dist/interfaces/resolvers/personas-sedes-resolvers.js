"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personasSedesResolvers = exports.controller = void 0;
const domain_1 = require("../../domain");
const personas_sedes_datasource_impl_1 = require("../../infrastructure/datasource/personas-sedes-datasource-impl");
const personas_sedes_repository_impl_1 = require("../../infrastructure/repositories/personas-sedes-repository-impl");
const personas_sedes_controller_1 = require("../../aplication/controller/personas-sedes-controller");
const personasSedesDataSource = new personas_sedes_datasource_impl_1.PersonasSedesDataSourceImpl();
const personasSedesRepository = new personas_sedes_repository_impl_1.PersonasSedesRepositoryImpl(personasSedesDataSource);
const getPersonaSedeUseCase = new domain_1.GetPersonaSedeUseCaseImpl(personasSedesRepository);
const getPersonasSedesUseCase = new domain_1.GetPersonasSedesUseCaseImpl(personasSedesRepository);
const createPersonaSedeUseCase = new domain_1.CreatePersonaSedeUseCaseImpl(personasSedesRepository);
const updatePersonaSedeUseCase = new domain_1.UpdatePersonaSedeUseCaseImpl(personasSedesRepository);
const deletePersonaSedeUseCase = new domain_1.DeletePersonaSedeUseCaseImpl(personasSedesRepository);
exports.controller = new personas_sedes_controller_1.PersonasSedesController(getPersonaSedeUseCase, getPersonasSedesUseCase, createPersonaSedeUseCase, updatePersonaSedeUseCase, deletePersonaSedeUseCase);
exports.personasSedesResolvers = {
    Query: {
        getPersonaSede: (_, args) => exports.controller.getById(args.id_sede),
        getPersonasSedes: () => exports.controller.getAll(),
    },
    Mutation: {
        createPersonaSede: (_, args) => exports.controller.create(args.personasSede),
        updatePersonaSede: (_, args) => exports.controller.update(args.id_sede, args.personasSede),
        deletePersonaSede: (_, args) => exports.controller.delete(args.id_sede),
    },
};
//# sourceMappingURL=personas-sedes-resolvers.js.map