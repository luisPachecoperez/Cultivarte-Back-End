import gql from 'graphql-tag';

export const personasGrupoInteresTypeDefs = gql`
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
    getPersonasGrupoInteres(limit: Int!, offset: Int!): [PersonaGrupoInteres!]!
  }

  type Mutation {
    createPersonaGrupoInteres(input: PersonaGrupoInteresInput!): RespuestaGrap
    updatePersonaGrupoInteres(input: PersonaGrupoInteresInput!): RespuestaGrap
    deletePersonaGrupoInteres(id_personas_grupo_interes: ID!): RespuestaGrap
  }
`;
