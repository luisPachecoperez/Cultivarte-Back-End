"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personasGrupoInteresResolvers = void 0;
const personas_grupo_interes_datasource_impl_1 = require("../../infrastructure/datasource/personas-grupo-interes-datasource-impl");
const personas_grupo_interes_repository_impl_1 = require("../../infrastructure/repositories/personas-grupo-interes-repository-impl");
const personas_grupos_interes_controller_1 = require("../../aplication/controller/personas-grupos-interes-controller");
const domain_1 = require("../../domain");
const dataSource = new personas_grupo_interes_datasource_impl_1.PersonasGrupoInteresDataSourceImpl();
const repository = new personas_grupo_interes_repository_impl_1.PersonasGrupoInteresRepositoryImpl(dataSource);
const useCaseGetById = new domain_1.GetPersonaGrupoInteresUseCaseImpl(repository);
const useCaseGetAll = new domain_1.GetPersonasGrupoInteresUseCaseImpl(repository);
const useCaseCreate = new domain_1.CreatePersonaGrupoInteresUseCaseImpl(repository);
const useCaseUpdate = new domain_1.UpdatePersonaGrupoInteresUseCaseImpl(repository);
const useCaseDelete = new domain_1.DeletePersonaGrupoInteresUseCaseImpl(repository);
const controller = new personas_grupos_interes_controller_1.PersonasGruposInteresController(useCaseGetById, useCaseGetAll, useCaseCreate, useCaseUpdate, useCaseDelete);
exports.personasGrupoInteresResolvers = {
    Query: {
        getPersonaGrupoInteresById: (_parent, args) => controller.getPersonaGrupoInteresById(args.id_persona_grupo_interes),
        getPersonasGrupoInteres: () => controller.getPersonasGrupoInteres(),
    },
    Mutation: {
        createPersonaGrupoInteres: (_parent, args) => controller.createPersonaGrupoInteres(args.personaGrupoInteres),
        updatePersonaGrupoInteres: (_parent, args) => controller.updatePersonaGrupoInteres(args.id_persona_grupo_interes, args.personaGrupoInteres),
        deletePersonaGrupoInteres: (_parent, args) => controller.deletePersonaGrupoInteres(args.id_persona_grupo_interes),
    },
};
//# sourceMappingURL=personas-grupo-interes-resolver.js.map