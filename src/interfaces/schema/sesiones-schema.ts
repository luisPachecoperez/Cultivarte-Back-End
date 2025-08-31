import gql from "graphql-tag";

export const sesionesTypeDefs = gql`

    type Sesion {
        id_sesion: ID!
        id_actividad: ID!
        fecha_actividad: String
        hora_inicio: String!
        hora_fin: String!
        imagen: String
        nro_asistentes: Int

        id_creado_por: ID
        fecha_creacion: String
        id_modificado_por: ID
        fecha_modificacion: String
    }

    input CreateSesionInput {
        id_sesion: ID!
        id_actividad: ID!
        fecha_actividad: String
        hora_inicio: String!
        hora_fin: String!
        imagen: String
        nro_asistentes: Int
        id_creado_por: ID
        fecha_creacion: String
        id_modificado_por: ID
        fecha_modificacion: String
    }

    input UpdateSesionInput {
        id_sesion: ID!
        id_actividad: ID!
        fecha_actividad: String
        hora_inicio: String
        hora_fin: String
        imagen: String
        nro_asistentes: Int
        id_creado_por: ID
        fecha_creacion: String
        id_modificado_por: ID
        fecha_modificacion: String
    }
    
    type RespuestaGrap {
        exitoso: String!
        mensaje: String!
    }

    input SesionEliminadaInput {
        id_sesion: ID!
    }

    input EditarSesiones {
        nuevos: [CreateSesionInput!]!
        modificados: [UpdateSesionInput!]!
        eliminados: [SesionEliminadaInput!]!
    }

    type Query {
        getSesion(id_sesion: ID!): Sesion
        getSesiones: [Sesion!]!
        getSesionesSedes(id_usuario: ID!, fecha_inicio: String!, fecha_fin: String!): [Sesion!]!
    }

    type Mutation {
        createSesion(input: CreateSesionInput!): Sesion!
        updateSesion(input: UpdateSesionInput!): RespuestaGrap!
        updateSesiones(input: EditarSesiones!): RespuestaGrap!
        deleteSesion(id_sesion: ID!): Boolean!
    }
`;
