"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametroGeneralTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.parametroGeneralTypeDefs = (0, graphql_tag_1.default) `
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
    updateParametroGeneral(
      id: ID!
      data: ParametroGeneralInput!
    ): ParametroGeneral
    deleteParametroGeneral(id: ID!): Boolean
  }
`;
//# sourceMappingURL=parametros-generales-schema.js.map