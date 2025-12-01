"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametroDetalleTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.parametroDetalleTypeDefs = (0, graphql_tag_1.gql) `
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
    updateParametroDetalle(
      id: ID!
      data: ParametroDetalleInput!
    ): ParametroDetalle
    deleteParametroDetalle(id: ID!): Boolean
  }
`;
//# sourceMappingURL=parametros-detalle-schema.js.map