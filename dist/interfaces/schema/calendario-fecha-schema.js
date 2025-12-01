"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarioFechaTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.calendarioFechaTypeDefs = (0, graphql_tag_1.gql) `
  type Evento {
    id_actividad: ID!
    id_sesion: ID!
    nombre_actividad: String!
    desde: String!
    hasta: String!
    asistentes_evento: Int!
  }

  input CalendarioInput {
    fecha_inicial: String!
    fecha_final: String!
    id_usuario: String!
  }

  type Query {
    consultarFechaCalendario(input: CalendarioInput!): [Evento!]!
  }
`;
//# sourceMappingURL=calendario-fecha-schema.js.map