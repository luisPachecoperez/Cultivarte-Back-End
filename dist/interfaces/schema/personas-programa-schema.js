"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personasProgramaSchema = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.personasProgramaSchema = (0, graphql_tag_1.default) `
  type PersonaPrograma {
    id_persona_programa: ID!
    id_persona: ID!
    id_programa: ID!

    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input PersonaProgramaInput {
    id_persona_programa: ID
    id_persona: ID!
    id_programa: ID
    id_creado_por: ID
    fecha_creacion: String
  }

  type RespuestaGrap {
    exitoso: String!
    mensaje: String!
  }

  type Query {
    getPersonaProgramas: [PersonaPrograma!]!
    getPersonaProgramaById(id_persona_programa: ID!): PersonaPrograma
  }

  type Mutation {
    createPersonaPrograma(input: PersonaProgramaInput!): RespuestaGrap!
    updatePersonaPrograma(
      id_persona_programa: ID!
      input: PersonaProgramaInput!
    ): RespuestaGrap!
    deletePersonaPrograma(id_persona_programa: ID!): RespuestaGrap!
  }
`;
//# sourceMappingURL=personas-programa-schema.js.map