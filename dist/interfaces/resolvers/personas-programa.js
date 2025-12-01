"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personasProgramaResolvers = void 0;
const domain_1 = require("../../domain");
const personas_programa_datasource_impl_1 = require("../../infrastructure/datasource/personas-programa-datasource-impl");
const personas_programa_repository_impl_1 = require("../../infrastructure/repositories/personas-programa-repository-impl");
const personas_programa_controller_1 = require("../../aplication/controller/personas-programa-controller");
const dataSource = new personas_programa_datasource_impl_1.PersonasProgramaDataSourceImpl();
const repository = new personas_programa_repository_impl_1.PersonasProgramaRepositoryImpl(dataSource);
const useCaseGetById = new domain_1.GetPersonaProgramaUseCaseImpl(repository);
const useCaseGetAll = new domain_1.GetPersonasProgramaUseCaseImpl(repository);
const useCaseCreate = new domain_1.CreatePersonaProgramaUseCaseImpl(repository);
const useCaseUpdate = new domain_1.UpdatePersonaProgramaUseCaseImpl(repository);
const useCaseDelete = new domain_1.DeletePersonaProgramaUseCaseImpl(repository);
const controller = new personas_programa_controller_1.PersonasProgramaController(useCaseCreate, useCaseUpdate, useCaseDelete, useCaseGetById, useCaseGetAll);
exports.personasProgramaResolvers = {
    Query: {
        getPersonaProgramaById: (_parent, args) => controller.getPersonaPrograma(args.id_persona_programa),
        getPersonaProgramas: () => controller.getPersonasPrograma(),
    },
    Mutation: {
        createPersonaPrograma: (_parent, args) => controller.createPersonaPrograma(args.personaPrograma),
        updatePersonaPrograma: (_parent, args) => controller.updatePersonaPrograma(args.id_persona_programa, args.personaPrograma),
        deletePersonaPrograma: (_parent, args) => controller.deletePersonaPrograma(args.id_persona_programa),
    },
};
//# sourceMappingURL=personas-programa.js.map