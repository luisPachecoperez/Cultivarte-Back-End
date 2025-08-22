import { gql } from 'graphql-tag';

export const parametroDetalleTypeDefs = gql`
  type ParametroDetalle {
    id_parametro_detalle: ID!
    id_parametro_general: ID!
    nombre: String
    codigo: String
    orden: Int
    valores: String
    estado: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input ParametroDetalleInput {
    id_parametro_general: ID!
    nombre: String
    codigo: String
    orden: Int
    valores: String
    estado: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  type Query {
    getParametrosDetalle: [ParametroDetalle]
    getParametroDetalle(id: ID!): ParametroDetalle
  }

  type Mutation {
    createParametroDetalle(data: ParametroDetalleInput!): ParametroDetalle
    updateParametroDetalle(id: ID!, data: ParametroDetalleInput!): ParametroDetalle
    deleteParametroDetalle(id: ID!): Boolean
  }
`;