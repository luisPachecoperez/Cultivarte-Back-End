import { gql } from 'graphql-tag';

export const calendarioFechaTypeDefs = gql`
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
