import gql from 'graphql-tag';

export const asistenciasTypeDefs = gql`
  type Asistencia {
    id_asistencia: ID!
    id_sesion: ID!
    id_persona: ID

    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input CreateAsistenciaInput {
    id_sesion: ID!
    id_persona: ID
    id_creado_por: ID
  }

  input UpdateAsistenciaInput {
    id_asistencia: ID
    id_actividad: ID
    id_sesion: ID
    id_persona: ID
    imagen: String
    numero_asistentes: Int
    descripcion: String
    nuevos: [Nuevo]
  }

  input Nuevo {
    id_persona: ID!
    id_asistencia: ID!
    id_sesion: ID!
  }

  type PreAsistencia {
    id_sesion: ID!
    id_sede: ID!
    numero_asistentes: Int!
    foto: String!
    imagen: String!
    descripcion: String!
    sedes: [Sede]!
    beneficiarios: [Beneficiario]!
    asistentes_sesiones: [AsistenteSesion]!
  }

  type Sede {
    id_sede: ID!
    nombre: String!
  }

  type Beneficiario {
    id_persona: ID!
    nombre_completo: String!
    id_sede: ID!
  }

  type RespuestaGrap {
    exitoso: String!
    mensaje: String!
  }

  type AsistenteSesion {
    id_persona: ID!
    eliminar: String!
  }

  type Query {
    getAsistencia(id_asistencia: ID!): Asistencia
    getAsistencias: [Asistencia!]!
    getPreAsistencia(id_sesion: ID!): PreAsistencia
    getAsistenciasSede(
      id_usuario: String
      fecha_inicio: String
      fecha_fin: String
      limit: Int!
      offset: Int!
    ): [Asistencia!]!
  }

  type Mutation {
    createAsistencia(input: CreateAsistenciaInput!): RespuestaGrap!
    updateAsistencia(
      id_asistencia: ID!
      input: UpdateAsistenciaInput!
    ): RespuestaGrap!
    updateAsistencias(input: UpdateAsistenciaInput!): RespuestaGrap!
    deleteAsistencia(id_asistencia: ID!): RespuestaGrap!
  }
`;
