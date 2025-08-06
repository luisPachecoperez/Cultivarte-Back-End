import { gql } from "graphql-tag";

export const parametriaEventosTypeDefs = gql`
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