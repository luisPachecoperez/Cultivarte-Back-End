
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Date
  type Evento {
    id: ID!
    institucional: String!
    id_tipo_evento: ID!
    nombre_evento: String!
    descripcion: String!
    id_responsable: ID!
    id_aliado: ID!
    id_sede: ID!
    fecha_evento_desde: Date
    fecha_evento_hasta: Date
    programacion: ID
    estado: String
    creado_por: String
    fecha_creacion: Date
    modificado_por: String
    fecha_modificacion: Date
  }
  input EventoInput {
    institucional: String!
    id_tipo_evento: ID!
    nombre_evento: String!
    descripcion: String!
    id_responsable: ID!
    id_aliado: ID!
    id_sede: ID!
    fecha_evento_desde: Date
    fecha_evento_hasta: Date
    programacion: ID
    estado: String
    creado_por: String
  }
  type Query {
    eventos: [Evento!]!
    evento(id: ID!): Evento
  }
  type Mutation {
    createEvento(data: EventoInput!): Evento!
    updateEvento(id: ID!, data: EventoInput!): Evento
    deleteEvento(id: ID!): Boolean!
  }
`;