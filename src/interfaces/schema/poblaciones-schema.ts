import { gql } from "graphql-tag";

export const poblacionTypeDefs = gql`
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
