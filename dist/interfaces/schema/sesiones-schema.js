"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesionesTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.sesionesTypeDefs = (0, graphql_tag_1.default) `
  type Sesion {
    id_sesion: ID!
    id_actividad: ID!
    fecha_actividad: String
    hora_inicio: String!
    hora_fin: String!
    imagen: String
    nro_asistentes: Int
    descripcion: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input CreateSesionInput {
    id_sesion: ID!
    id_actividad: ID!
    fecha_actividad: String
    hora_inicio: String!
    hora_fin: String!
    imagen: String
    nro_asistentes: Int
    descripcion: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input UpdateSesionInput {
    id_sesion: ID!
    id_actividad: ID!
    fecha_actividad: String
    hora_inicio: String
    hora_fin: String
    imagen: String
    nro_asistentes: Int
    descripcion: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  type RespuestaGrap {
    exitoso: String!
    mensaje: String!
  }

  input SesionEliminadaInput {
    id_sesion: ID!
  }

  input EditarSesiones {
    nuevos: [CreateSesionInput!]!
    modificados: [UpdateSesionInput!]!
    eliminados: [SesionEliminadaInput!]!
  }

  type Query {
    getSesion(id_sesion: ID!): Sesion
    getSesiones(limit: Int!, offset: Int!): [Sesion!]!
    getSesionesSedes(
      id_usuario: ID!
      fecha_inicio: String!
      fecha_fin: String!
    ): [Sesion!]!
  }

  type Mutation {
    createSesion(input: CreateSesionInput!): RespuestaGrap!
    updateSesion(input: UpdateSesionInput!): RespuestaGrap!
    updateSesiones(input: EditarSesiones!): RespuestaGrap!
    deleteSesion(id_sesion: ID!): RespuestaGrap!
  }
`;
//# sourceMappingURL=sesiones-schema.js.map