import gql from 'graphql-tag';

export const sedeTypeDefs = gql`
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
