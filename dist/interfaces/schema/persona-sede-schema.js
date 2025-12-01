"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaSedeTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.personaSedeTypeDefs = (0, graphql_tag_1.default) `
  type PersonaSede {
    id_personas_sede: ID!
    id_persona: ID!
    id_sede: ID!

    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String

    # Relación opcional
    persona: Persona
    sede: Sede
  }

  # Mutaciones básicas
  input CrearPersonaSedeInput {
    id_persona: ID!
    id_sede: ID!
    id_creado_por: ID
  }

  input ActualizarPersonaSedeInput {
    id_personas_sede: ID!
    id_modificado_por: ID
    id_sede: ID
  }

  type Query {
    getPersonaSede(id_personas_sede: ID!): PersonaSede
    getPersonasSedes: [PersonaSede!]!
  }

  type Mutation {
    createPersonaSede(input: CrearPersonaSedeInput!): PersonaSede
    updatePersonaSede(
      id_persona_sede: ID!
      input: ActualizarPersonaSedeInput!
    ): PersonaSede
    deletePersonaSede(id: ID!): Boolean
  }
`;
//# sourceMappingURL=persona-sede-schema.js.map