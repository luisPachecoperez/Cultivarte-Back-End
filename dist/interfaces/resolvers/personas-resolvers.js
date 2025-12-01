"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personasResolvers = void 0;
const domain_1 = require("../../domain");
const personas_controller_1 = require("../../aplication/controller/personas-controller");
const persona_repository_impl_1 = require("../../infrastructure/repositories/persona-repository-impl");
const personas_datasource_impl_1 = require("../../infrastructure/datasource/personas-datasource-impl");
const personaDataSource = new personas_datasource_impl_1.PersonaDataSourceImpl();
const personaRepository = new persona_repository_impl_1.PersonaRepositoryImpl(personaDataSource);
const getPersonasUseCase = new domain_1.GetPersonasUseCaseImpl(personaRepository);
const getPersonaUseCase = new domain_1.GetPersonaUseCaseImpl(personaRepository);
const createPersonaUseCase = new domain_1.CreatePersonaUseCaseImpl(personaRepository);
const updatePersonaUseCase = new domain_1.UpdatePersonaUseCaseImpl(personaRepository);
const deletePersonaUseCase = new domain_1.DeletePersonaUseCaseImpl(personaRepository);
const getAliadosSedeUseCase = new domain_1.GetAliadosSedeUseCaseImpl(personaRepository);
const getBeneficiariosSedeUseCase = new domain_1.GetBeneficiariosSedeUseCaseImpl(personaRepository);
const controller = new personas_controller_1.PersonasController(getPersonaUseCase, getPersonasUseCase, getAliadosSedeUseCase, getBeneficiariosSedeUseCase, createPersonaUseCase, updatePersonaUseCase, deletePersonaUseCase);
exports.personasResolvers = {
    Query: {
        getPersonas: (_, args) => controller.getPersonas(args.limit, args.offset),
        getPersona: (_, args) => controller.getPersona(args.id),
        getAliadosSede: (_, args) => controller.getAliadosSede(args.id_persona),
        getBeneficiariosSede: () => controller.getBenSedes(),
    },
    Mutation: {
        createPersona: (_, args) => controller.createPersona(args.data),
        updatePersona: (_, args) => controller.updatePersona(args.id, args.data),
        deletePersona: (_, args) => controller.deletePersona(args.id),
    },
};
//# sourceMappingURL=personas-resolvers.js.map