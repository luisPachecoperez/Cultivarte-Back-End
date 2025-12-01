"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
const parametros_detalle_schema_1 = require("../schema/parametros-detalle-schema");
const parametros_generales_schema_1 = require("../schema/parametros-generales-schema");
const parametria_eventos_schema_1 = require("../schema/parametria-eventos-schema");
const calendario_fecha_schema_1 = require("../schema/calendario-fecha-schema");
const actividades_schema_1 = require("../schema/actividades-schema");
const sesiones_schema_1 = require("../schema/sesiones-schema");
const asistencias_schema_1 = require("../schema/asistencias-schema");
const personas_schema_1 = require("../schema/personas-schema");
const poblaciones_schema_1 = require("../schema/poblaciones-schema");
const sede_schema_1 = require("../schema/sede-schema");
const persona_sede_schema_1 = require("../schema/persona-sede-schema");
const personas_grupo_interes_schema_1 = require("../schema/personas-grupo-interes-schema");
const personas_programa_schema_1 = require("../schema/personas-programa-schema");
exports.typeDefs = (0, graphql_tag_1.gql) `
  ${parametros_detalle_schema_1.parametroDetalleTypeDefs}
  ${parametros_generales_schema_1.parametroGeneralTypeDefs}
  ${parametria_eventos_schema_1.parametriaEventosTypeDefs}
  ${calendario_fecha_schema_1.calendarioFechaTypeDefs}
  ${actividades_schema_1.actividadesTypeDefs}
  ${sesiones_schema_1.sesionesTypeDefs}
  ${asistencias_schema_1.asistenciasTypeDefs}
  ${personas_schema_1.personaTypeDefs}
  ${poblaciones_schema_1.poblacionTypeDefs}
  ${sede_schema_1.sedeTypeDefs}
  ${persona_sede_schema_1.personaSedeTypeDefs}
  ${personas_grupo_interes_schema_1.personasGrupoInteresTypeDefs}
  ${personas_programa_schema_1.personasProgramaSchema}
`;
//# sourceMappingURL=typeDef.js.map