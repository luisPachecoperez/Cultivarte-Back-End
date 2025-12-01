"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarioFechaResolvers = void 0;
const calendario_fecha_controller_1 = require("../../aplication/controller/calendario-fecha-controller");
const calendario_fecha_datasource_impl_1 = require("../../infrastructure/datasource/calendario-fecha-datasource-impl");
const calendario_fecha_repository_impl_1 = require("../../infrastructure/repositories/calendario-fecha-repository-impl");
const get_calendario_fecha_1 = require("../../domain/use-cases/calendario/get-calendario-fecha");
const dataSource = new calendario_fecha_datasource_impl_1.CalendarioFechaDataSourceImpl();
const repository = new calendario_fecha_repository_impl_1.CalendarioFechaRepositoryImpl(dataSource);
const useCaseGetByDate = new get_calendario_fecha_1.GetCalendarioFechaUseCaseImpl(repository);
const controller = new calendario_fecha_controller_1.CalendarioFechaController(useCaseGetByDate);
exports.calendarioFechaResolvers = {
    Query: {
        consultarFechaCalendario: (_, { input }) => controller.getByDate(input),
    },
};
//# sourceMappingURL=calendario-fecha-resolvers.js.map