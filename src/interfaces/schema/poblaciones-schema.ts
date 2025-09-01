import { gql } from "graphql-tag";

export const poblacionTypeDefs = gql`
    type Poblacion {
        id_poblacion: ID!
        nombre: String!
        id_sede: ID!
    }

    input PoblacionInput {
        id_poblacion: ID!
        nombre: String!
        id_sede: ID!
    }
    
    type Query {
        getPoblaciones: [Poblacion]
        getPoblacion(id_poblacion: ID!): Poblacion
    }

    type Mutation {
        createPoblacion(input: PoblacionInput!): Poblacion
        updatePoblacion(id_poblacion: ID!, input: PoblacionInput!): Poblacion
        deletePoblacion(id_poblacion: ID!): Poblacion
    }
    
`;