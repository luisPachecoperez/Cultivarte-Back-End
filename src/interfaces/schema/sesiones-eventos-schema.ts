import { gql } from 'graphql-tag';

export const sesionesTypeDefs = gql`
  type Evento {
    id_evento: ID!
    nombre_evento: String!
    descripcion: String
  }

  type Sesion {
    id_sesion: ID!
    desde: String!
    hasta: String!
    estado: String
    creado_por: String
    fecha_creacion: String
    modificado_por: String
    fecha_modificacion: String
    evento: Evento!
  }

  type Query {
    getSesionesEventos: [Sesion]
  }
`;
