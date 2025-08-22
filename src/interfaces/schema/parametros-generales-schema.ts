import gql from "graphql-tag";


export const parametroGeneralTypeDefs = gql`
  type ParametroGeneral {
    id_parametro_general: ID!
    nombre_parametro: String
    descripcion: String
    estado: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input ParametroGeneralInput {
    nombre_parametro: String
    descripcion: String
    estado: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  type Query {
    getParametrosGenerales: [ParametroGeneral]
    getParametroGeneral(id: ID!): ParametroGeneral
  }

  type Mutation {
    createParametroGeneral(data: ParametroGeneralInput!): ParametroGeneral
    updateParametroGeneral(id: ID!, data: ParametroGeneralInput!): ParametroGeneral
    deleteParametroGeneral(id: ID!): Boolean
  }
`;