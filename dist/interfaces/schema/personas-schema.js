"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.personaTypeDefs = (0, graphql_tag_1.default) `
  type Persona {
    id_persona: ID!
    id_tipo_persona: ID!
    id_colegio: ID
    id_sexo: ID!
    id_ubicacion: ID!
    id_pais: ID
    id_departamento: ID
    id_ciudad: ID
    id_tipo_identificacion: ID!
    identificacion: String
    nombres: String
    apellidos: String
    razon_social: String
    fecha_nacimiento: String
    nombre_acudiente: String
    apellidos_acudiente: String
    correo_acudiente: String
    celular_acudiente: String
    archivo_habeas_data: String
    acepta_habeas_data: Boolean
    fecha_habeas_data: String
    canal_habeas_data: String
    soporte_habeas_data: Boolean
    dir_ip_habeas_data: String
    email: String
    email_contacto: String
    telefono_movil_contacto: String
    telefono_movil: String
    eliminado: String
    id_creado_por: ID
    fecha_creacion: String
    id_modificado_por: ID
    fecha_modificacion: String
    estado: String
    id_sede: ID!
  }

  input PersonaInput {
    id_persona: ID
    id_tipo_persona: ID!
    id_colegio: ID
    id_sexo: ID!
    id_ubicacion: ID!
    id_pais: ID
    id_departamento: ID
    id_ciudad: ID
    id_tipo_identificacion: ID!
    identificacion: String
    nombres: String
    apellidos: String
    razon_social: String
    fecha_nacimiento: String
    nombre_acudiente: String
    apellidos_acudiente: String
    correo_acudiente: String
    celular_acudiente: String
    archivo_habeas_data: String
    acepta_habeas_data: Boolean
    fecha_habeas_data: String
    canal_habeas_data: String
    soporte_habeas_data: Boolean
    dir_ip_habeas_data: String
    email: String
    email_contacto: String
    telefono_movil_contacto: String
    telefono_movil: String
    eliminado: String
  }

  type Query {
    getPersonas(limit: Int!, offset: Int!): [Persona!]!
    getPersona(id_persona: ID!): Persona
    getAliadosSede(id_persona: ID!): [Persona]
    getBeneficiariosSede: [Persona!]!
  }

  type Mutation {
    createPersona(input: PersonaInput!): Persona!
    updatePersona(id_persona: ID!, input: PersonaInput!): Persona!
    deletePersona(id_persona: ID!): Boolean!
  }
`;
//# sourceMappingURL=personas-schema.js.map