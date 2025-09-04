import gql from "graphql-tag";

export const personasProgramaSchema = gql`

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
        updatePersonaPrograma(id_persona_programa: ID!, input: PersonaProgramaInput!): RespuestaGrap!
        deletePersonaPrograma(id_persona_programa: ID!): RespuestaGrap!
    }
`;
