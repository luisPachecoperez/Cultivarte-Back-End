"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const parametro_detalle_resolvers_1 = require("../resolvers/parametro-detalle-resolvers");
const parametros_generales_resolvers_1 = require("../resolvers/parametros-generales-resolvers");
const parametria_eventos_resolvers_1 = require("../resolvers/parametria-eventos-resolvers");
const calendario_fecha_resolvers_1 = require("../resolvers/calendario-fecha-resolvers");
const actividades_resolvers_1 = require("../resolvers/actividades-resolvers");
const sesiones_resolver_1 = require("../resolvers/sesiones-resolver");
const asistencias_resolvers_1 = require("../resolvers/asistencias-resolvers");
const personas_resolvers_1 = require("../resolvers/personas-resolvers");
const poblaciones_resolvers_1 = require("../resolvers/poblaciones-resolvers");
const sede_resolvers_1 = require("../resolvers/sede-resolvers");
const personas_sedes_resolvers_1 = require("../resolvers/personas-sedes-resolvers");
const personas_grupo_interes_resolver_1 = require("../resolvers/personas-grupo-interes-resolver");
const personas_programa_1 = require("../resolvers/personas-programa");
exports.resolvers = (0, merge_1.mergeResolvers)([
    parametro_detalle_resolvers_1.parametroDetalleResolvers,
    parametros_generales_resolvers_1.parametrosGeneralesResolvers,
    parametria_eventos_resolvers_1.parametriaEventosResolvers,
    calendario_fecha_resolvers_1.calendarioFechaResolvers,
    actividades_resolvers_1.actividadesResolvers,
    sesiones_resolver_1.sesionesResolvers,
    asistencias_resolvers_1.asistenciasResolvers,
    personas_resolvers_1.personasResolvers,
    poblaciones_resolvers_1.poblacionesResolvers,
    sede_resolvers_1.sedeResolvers,
    personas_sedes_resolvers_1.personasSedesResolvers,
    personas_grupo_interes_resolver_1.personasGrupoInteresResolvers,
    personas_programa_1.personasProgramaResolvers,
]);
//# sourceMappingURL=resolvers.js.map