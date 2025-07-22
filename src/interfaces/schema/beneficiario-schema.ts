import { gql } from 'graphql-tag';

export const beneficiarioTypeDefs = gql`
  type Beneficiario {
    id_beneficiario: ID!
    id_colegio: ID
    nombre: String!
    primer_apellido: String!
    segundo_apellido: String
    fecha_nacimiento: String!
    identificacion: String!
    genero: String!
    ubicacion: String!
    nombre_acudiente: String!
    primer_apellido_acudiente: String!
    segundo_apellido_acudiente: String
    correo_acudiente: String!
    celular_acudiente: String!
    habeas_data: String
    creado_por: String
    fecha_creacion: String
    modificado_por: String
    fecha_modificacion: String
  }

  input BeneficiarioInput {
    id_colegio: ID
    nombre: String!
    primer_apellido: String!
    segundo_apellido: String
    fecha_nacimiento: String!
    identificacion: String!
    genero: String!
    ubicacion: String!
    nombre_acudiente: String!
    primer_apellido_acudiente: String!
    segundo_apellido_acudiente: String
    correo_acudiente: String!
    celular_acudiente: String!
    habeas_data: String
    creado_por: String
  }

  type Query {
    beneficiarios: [Beneficiario!]!
    beneficiario(id: ID!): Beneficiario
  }

  type Mutation {
    createBeneficiario(data: BeneficiarioInput!): Beneficiario
    updateBeneficiario(id: ID!, data: BeneficiarioInput!): Beneficiario
    deleteBeneficiario(id: ID!): Boolean
  }
`;