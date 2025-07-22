import gql from "graphql-tag";


export const parametroGeneralTypeDefs = gql`
  type ParametroGeneral {
    id_parametro_general: ID!
    nombre_parametro: String
    descripcion: String
    estado: String
    creado_por: String
    fecha_creacion: String
    modificado_por: String
    fecha_modificacion: String
  }

  input ParametroGeneralInput {
    nombre_parametro: String
    descripcion: String
    estado: String
    creado_por: String
  }

  type Query {
    parametrosGenerales: [ParametroGeneral]
    parametroGeneral(id: ID!): ParametroGeneral
  }

  type Mutation {
    createParametroGeneral(data: ParametroGeneralInput!): ParametroGeneral
    updateParametroGeneral(id: ID!, data: ParametroGeneralInput!): ParametroGeneral
    deleteParametroGeneral(id: ID!): Boolean
  }
`;