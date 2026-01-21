import gql from 'graphql-tag';

export const excepcionesSchema = gql`
  type RespuestaGrap {
    exitoso: String
    mensaje: String
  }

  type Excepcion {
    id_excepcion: ID!
    error: String!
    mensaje: String!
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input IExcepcion {
    id_excepcion: ID!
    error: String!
    mensaje: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input ExcepcionEliminableInput {
    id_excepcion: ID!
  }

  input GestionarExcepcionesInput {
    nuevos: [IExcepcion]
    modificados: [IExcepcion]
    eliminados: [ExcepcionEliminableInput]
  }

  type Query {
    GetExcepciones: [Excepcion!]!
  }

  type Mutation {
    UpdateExcepciones(input: GestionarExcepcionesInput!): RespuestaGrap
  }
`;
