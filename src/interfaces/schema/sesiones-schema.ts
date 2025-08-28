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
        id_actividad: ID!
        fecha_actividad: String
        hora_inicio: String!
        hora_fin: String!
        imagen: String
        nro_asistentes: Int
        id_creado_por: ID
    }

    input UpdateSesionInput {
        id_sesion: ID!
        id_actividad: ID!
        fecha_actividad: String
        hora_inicio: String
        hora_fin: String
        imagen: String
        nro_asistentes: Int
        id_modificado_por: ID
    }

    input EditarSesiones {
        nuevos: [CreateSesionInput!]!
        modificados: [UpdateSesionInput!]!
        eliminados: [ID!]!
    }

    type Query {
        getSesion(id_sesion: ID!): Sesion
        getSesiones: [Sesion!]!
    }

    type Mutation {
        createSesion(input: CreateSesionInput!): Sesion!
        updateSesion(input: UpdateSesionInput!): Sesion!
        updateSesiones(input: EditarSesiones!): Boolean!
        deleteSesion(id_sesion: ID!): Boolean!
    }
`;
