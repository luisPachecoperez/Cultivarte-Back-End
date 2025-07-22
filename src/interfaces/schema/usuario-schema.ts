import gql from "graphql-tag";

export const usuarioTypeDefs = gql`
  type Usuario {
    id_usuario: ID!
    id_sede: ID!
    id_role: ID!
    correo: String!
    creado_por: String
    fecha_creacion: String
    modificado_por: String
    fecha_modificacion: String
  }

  input UsuarioInput {
    id_sede: ID!
    id_role: ID!
    correo: String!
    creado_por: String
  }

  type Query {
    usuarios: [Usuario]
    usuario(id: ID!): Usuario
  }

  type Mutation {
    createUsuario(data: UsuarioInput!): Usuario
    updateUsuario(id: ID!, data: UsuarioInput!): Usuario
    deleteUsuario(id: ID!): Boolean
  }
`;