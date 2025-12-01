"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personasGrupoInteresTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.personasGrupoInteresTypeDefs = (0, graphql_tag_1.default) `
  type PersonaGrupoInteres {
    id_personas_grupo_interes: ID!
    id_persona: ID!
    id_grupo_interes: ID!

    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input PersonaGrupoInteresInput {
    id_personas_grupo_interes: ID
    id_persona: ID!
    id_grupo_interes: ID!
    id_usuario: ID
  }

  type Query {
    getPersonaGrupoInteresById(
      id_personas_grupo_interes: ID!
    ): PersonaGrupoInteres
    getPersonasGrupoInteres: [PersonaGrupoInteres!]!
  }

  type Mutation {
    createPersonaGrupoInteres(input: PersonaGrupoInteresInput!): RespuestaGrap
    updatePersonaGrupoInteres(input: PersonaGrupoInteresInput!): RespuestaGrap
    deletePersonaGrupoInteres(id_personas_grupo_interes: ID!): RespuestaGrap
  }
`;
//# sourceMappingURL=personas-grupo-interes-schema.js.map