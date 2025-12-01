"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sedeTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.sedeTypeDefs = (0, graphql_tag_1.default) `
  type Sede {
    id_sede: ID!
    id_pais: ID!
    id_departamento: ID!
    id_ciudad: ID!
    id_regional_davivienda: ID!
    id_regional_seguros_bolivar: ID!
    id_tipo_inmueble: ID
    id_espacio: ID
    id_uso_inmueble: ID
    id_nivel_inmueble: ID
    id_condicion_urbana: ID
    id_clima: ID
    id_condicion_inmueble: ID
    nombre: String!
    numero_convenio: String
    fecha_apertura_sede: String
    matricula_inmobiliaria: String

    # Auditoría
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
  }

  input SedeInput {
    id_pais: ID!
    id_departamento: ID!
    id_ciudad: ID!
    id_regional_davivienda: ID!
    id_regional_seguros_bolivar: ID!
    id_tipo_inmueble: ID
    id_espacio: ID
    id_uso_inmueble: ID
    id_nivel_inmueble: ID
    id_condicion_urbana: ID
    id_clima: ID
    id_condicion_inmueble: ID
    nombre: String!
    numero_convenio: String
    fecha_apertura_sede: String
    matricula_inmobiliaria: String
  }

  type Query {
    getSedeById(id_sede: ID!): Sede
    getSedes: [Sede]
  }

  type Mutation {
    createSede(input: SedeInput!): Sede
    updateSede(id: ID!, input: SedeInput!): Sede
    deleteSede(id: ID!): Boolean
  }
`;
//# sourceMappingURL=sede-schema.js.map