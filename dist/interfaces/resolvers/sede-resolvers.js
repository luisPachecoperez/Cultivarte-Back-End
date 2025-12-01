"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sedeResolvers = exports.controller = void 0;
const sede_repository_impl_1 = require("../../infrastructure/repositories/sede-repository-impl");
const get_sedes_1 = require("../../domain/use-cases/sedes/get-sedes");
const get_sede_1 = require("../../domain/use-cases/sedes/get-sede");
const create_sede_1 = require("../../domain/use-cases/sedes/create-sede");
const update_sede_1 = require("../../domain/use-cases/sedes/update-sede");
const delete_sede_1 = require("../../domain/use-cases/sedes/delete-sede");
const sedes_controller_1 = require("../../aplication/controller/sedes-controller");
const sede_datasource_impl_1 = require("../../infrastructure/datasource/sede-datasource-impl");
const sedeDataSource = new sede_datasource_impl_1.SedeDataSourceImpl();
const sedeRepository = new sede_repository_impl_1.SedeRepositoryImpl(sedeDataSource);
const getSedesUseCase = new get_sedes_1.GetSedesUseCaseImpl(sedeRepository);
const getSedeUseCase = new get_sede_1.GetSedeUseCaseImpl(sedeRepository);
const createSedeUseCase = new create_sede_1.CreateSedeUseCaseImpl(sedeRepository);
const updateSedeUseCase = new update_sede_1.UpdateSedeUseCaseImpl(sedeRepository);
const deleteSedeUseCase = new delete_sede_1.DeleteSedeUseCaseImpl(sedeRepository);
exports.controller = new sedes_controller_1.SedesController(getSedesUseCase, getSedeUseCase, createSedeUseCase, updateSedeUseCase, deleteSedeUseCase);
exports.sedeResolvers = {
    Query: {
        getSedes: () => exports.controller.getAll(),
        getSedeById: (_, args) => exports.controller.getById(args.id_sede),
    },
    Mutation: {
        createSede: (_, args) => exports.controller.create(args.data),
        updateSede: (_, args) => exports.controller.update(args.id_sede, args.data),
        deleteSede: (_, args) => exports.controller.delete(args.id_sede),
    },
};
//# sourceMappingURL=sede-resolvers.js.map