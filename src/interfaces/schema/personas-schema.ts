import gql from 'graphql-tag';

export const personaTypeDefs = gql`
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
    id_tipo_identificacion_acudiente: ID
    identificacion_acudiente: String
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
    discapacitado: String
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
    id_tipo_identificacion_acudiente: ID!
    identificacion_acudiente: String
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
    id_sede: ID
    discapacitado: String
  }

  input EditarBeneficiarios {
    id_programa: ID!
    id_grupo_interes: ID!
    nuevos: [PersonaInput!]!
    modificados: [PersonaInput!]!
    eliminados: [ID!]!
  }

  type RespuestaGrap {
    exitoso: String!
    mensaje: String!
  }

  type SedeInfo {
    id_sede: ID!
    nombre: String!
  }

  type PaisInfo {
    id_pais: ID!
    nombre: String!
  }

  type TipoIdentificacionInfo {
    id_tipo_identificacion: ID!
    nombre: String!
  }

  type TipoPersonaInfo {
    id_tipo_persona: ID!
    nombre: String!
  }

  type SexoInfo {
    id_sexo: ID!
    nombre: String!
  }

  type UbicacionInfo {
    id_ubicacion: ID!
    nombre: String!
  }

  type PreBeneficiario {
    id_programa: ID!
    id_grupo_interes: ID!
    paises: [PaisInfo!]!
    sedes: [SedeInfo!]!
    tiposIdentificacion: [TipoIdentificacionInfo!]!
    tiposPersona: [TipoPersonaInfo!]!
    sexo: [SexoInfo!]!
    ubicaciones: [UbicacionInfo!]!
  }

  type Query {
    getPersonas(limit: Int!, offset: Int!): [Persona!]!
    getPersona(id_persona: ID!): Persona
    getAliadosSede(id_persona: ID!): [Persona]
    getBeneficiariosSede: [Persona!]!
    getPreBeneficiarios(id_usuario: ID!): [PreBeneficiario!]!
    getPersonasParams(
      id_sede: ID!
      id_programa: ID!
      id_grupo_interes: ID!
      limit: Int!
      offset: Int!
    ): [Persona!]!
    getPersonaByTipoIdenficacionNumeroIdentificacion(
      id_tipo_identificacion: ID!
      identificacion: String!
    ): Persona
  }

  type Mutation {
    createPersona(input: PersonaInput!): Persona!
    updatePersona(id_persona: ID!, input: PersonaInput!): Persona!
    deletePersona(id_persona: ID!): Boolean!
    updateBeneficiarios(input: EditarBeneficiarios!): RespuestaGrap!
  }
`;
