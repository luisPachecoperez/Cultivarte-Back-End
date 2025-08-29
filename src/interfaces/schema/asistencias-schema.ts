import gql from "graphql-tag";

export const asistenciasTypeDefs = gql` 
    type Asistencia {
        id_asistencia: ID!
        id_actividad: ID!
        id_sesion: ID!
        id_persona: ID

        id_creado_por: ID
        fecha_creacion: String
        id_modificado_por: ID
        fecha_modificacion: String
    }

    input CreateAsistenciaInput {
        id_actividad: ID!
        id_sesion: ID!
        id_persona: ID
        id_creado_por: ID
    }

    input UpdateAsistenciaInput {
        id_asistencia: ID!
        id_actividad: ID!
        id_sesion: ID!
        id_persona: ID
        imagen: String
        numero_asistentes: Int
        descripcion: String
        nuevos: [Nuevo]
    }
    
    input Nuevo {
        id_persona: ID!
    }
        
    type PreAsistencia {
        id_actividad: ID!
        id_sesion: ID!
        id_sede: ID!
        numero_asistentes: Int!
        foto: String
        imagen: String
        sedes: [Sede!]!
        beneficiarios: [Beneficiario!]!
        asistentes_sesiones: [AsistenteSesion!]!
    } 
    
    type Sede {
        id_sede: ID!
        nombre: String!
    }

    type Beneficiario {
        id_persona: ID!
        nombre_completo: String!
        id_sede: ID!
    }

    type AsistenteSesion {
        id_persona: ID!
    }

    type Query {
        getAsistencia(id_asistencia: ID!): Asistencia
        getAsistencias: [Asistencia!]!
        getPreAsistencia(id_sesion: ID!): PreAsistencia!
    }
        
    type Mutation {
        createAsistencia(input: CreateAsistenciaInput!): Asistencia!
        updateAsistencia(id_asistencia: ID!, input: UpdateAsistenciaInput!): Asistencia!
        updateAsistencias(input: UpdateAsistenciaInput!): RespuestaGrap!
        deleteAsistencia(id_asistencia: ID!): Boolean!
        
    }
`;
