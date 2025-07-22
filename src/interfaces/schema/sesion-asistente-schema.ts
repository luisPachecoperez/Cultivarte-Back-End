import gql from "graphql-tag";

export const sesionAsistenteTypeDefs = gql`
  type SesionAsistente {
    id_sesion_asistente: ID!
    id_sesion: ID!
    id_beneficiario: ID!
    imagen: String
    nro_asistentes: Float
    creado_por: String
    fecha_creacion: String
    modificado_por: String
    fecha_modificacion: String
  }

  input SesionAsistenteInput {
    id_sesion: ID!
    id_beneficiario: ID!
    imagen: String
    nro_asistentes: Float
    creado_por: String
  }

  type Query {
    sesionAsistentes: [SesionAsistente]
    sesionAsistente(id: ID!): SesionAsistente
  }

  type Mutation {
    createSesionAsistente(data: SesionAsistenteInput!): SesionAsistente
    updateSesionAsistente(id: ID!, data: SesionAsistenteInput!): SesionAsistente
    deleteSesionAsistente(id: ID!): Boolean
  }
`;