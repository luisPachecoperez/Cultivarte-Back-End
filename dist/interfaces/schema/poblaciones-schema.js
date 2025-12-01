"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poblacionTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.poblacionTypeDefs = (0, graphql_tag_1.gql) `
  type Poblacion {
    id_poblacion: ID!
    id_padre: ID
    nombre: String!
  }

  input PoblacionInput {
    id_poblacion: ID!
    id_padre: ID
    nombre: String!
  }

  type Query {
    getPoblaciones: [Poblacion]
    getPoblacion(id_poblacion: ID!): Poblacion
  }

  type Mutation {
    createPoblacion(input: PoblacionInput!): RespuestaGrap
    updatePoblacion(id_poblacion: ID!, input: PoblacionInput!): Poblacion
    deletePoblacion(id_poblacion: ID!): Poblacion
  }
`;
//# sourceMappingURL=poblaciones-schema.js.map