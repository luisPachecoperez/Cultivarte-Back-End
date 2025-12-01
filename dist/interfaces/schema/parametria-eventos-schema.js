"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametriaEventosTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.parametriaEventosTypeDefs = (0, graphql_tag_1.gql) `
  type ParametroItem {
    id: ID!
    nombre: String!
  }

  type ParametriaEventos {
    Roles: [ParametroItem]
    Listado_de_contenidos: [ParametroItem]
    actividad_general: [ParametroItem]
    Programacion: [ParametroItem]
    Aliados: [ParametroItem]
    Tipo_de_evento: [ParametroItem]
  }

  type Query {
    getParametriaEventos: ParametriaEventos
  }
`;
//# sourceMappingURL=parametria-eventos-schema.js.map