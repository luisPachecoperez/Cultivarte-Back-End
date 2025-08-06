import gql from "graphql-tag";

export const sesionTypeDefs = gql`
  type Sesion {
    id_sesion: ID!
    id_evento: ID!
    desde: String!
    hasta: String!
    estado: String
    creado_por: String
    fecha_creacion: String
    modificado_por: String
    fecha_modificacion: String
  }

  input SesionInput {
    id_evento: ID!
    desde: String!
    hasta: String!
    estado: String
    creado_por: String
  }

  type Query {
    getSesiones: [Sesion]
    getSesion(id: ID!): Sesion
  }

  type Mutation {
    createSesion(data: SesionInput!): Sesion
    updateSesion(id: ID!, data: SesionInput!): Sesion
    deleteSesion(id: ID!): Boolean
  }
`;