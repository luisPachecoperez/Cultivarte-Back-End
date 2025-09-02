import { gql } from "graphql-tag";

export const actividadesTypeDefs = gql`
    type Item {
        id: ID!
        nombre: String!
    }

    type NombresActividadItem {
        id_tipo_actividad: ID!
        nombre: String!
    }

    type FrecuenciaItem {
        id_frecuencia: ID!
        nombre: String!
    }

    type SedeItem {
        id_sede: ID!
        nombre: String!
    }

    type TipoActividadItem {
        id_tipo_actividad: ID!
        nombre: String!
    }

    type AliadoItem {
        id_aliado: ID!
        nombre: String!
    }

    type ResponsableItem {
        id_responsable: ID!
        nombre: String!
    }
    type Sesion {
        id_sesion: ID!
        fecha_actividad: String!
        hora_inicio: String!
        hora_fin: String!
        nro_asistentes: Int!
        id_creado_por: ID!
        fecha_creacion: String!
        id_modificado_por: ID!
        fecha_modificacion: String!
    }

    type PreCreateEvent {
        id_programa: ID
        sedes: [SedeItem]
        tiposDeActividad: [TipoActividadItem]
        aliados: [AliadoItem]
        responsables: [ResponsableItem]
        nombresDeActividad: [NombresActividadItem]
        frecuencias: [FrecuenciaItem]
    }

    type PreEditActividad {
        id_programa: ID!
        sedes: [SedeItem!]!
        tiposDeActividad: [TipoActividadItem!]!
        aliados: [AliadoItem!]!
        responsables: [ResponsableItem!]!
        nombresDeActividad: [NombresActividadItem!]!
        frecuencias: [FrecuenciaItem!]!
        actividad: Actividad
        sesiones: [Sesion!]
    }

    type Actividad {
        id_actividad: ID!
        id_programa: ID!
        id_tipo_actividad: ID!
        id_responsable: ID!
        id_aliado: ID!
        id_sede: ID!
        id_frecuencia: ID
        institucional: String!
        nombre_actividad: String!
        descripcion: String!
        fecha_actividad: String
        hora_inicio: String
        hora_fin: String
        plazo_asistencia: String
        estado: String
        id_creado_por: ID
        fecha_creacion: String
        id_modificado_por: ID
        fecha_modificacion: String
    }

    type RespuestaGrap {
        exitoso: String!
        mensaje: String!
    }

    input ActividadInput {
        id_actividad: ID!
        id_programa: ID!
        id_tipo_actividad: ID!
        id_responsable: ID!
        id_aliado: ID!
        id_sede: ID!
        id_frecuencia: ID
        institucional: String!
        nombre_actividad: String!
        descripcion: String!
        fecha_actividad: String
        hora_inicio: String
        hora_fin: String
        plazo_asistencia: String
        estado: String
        id_creado_por: ID
        fecha_creacion: String
        id_modificado_por: ID
        fecha_modificacion: String
    }
        
    type Query {
        getActividades: [Actividad!]!
        getPreCreateActividad(id_usuario: ID!): PreCreateEvent
        getPreEditActividad(id_actividad: ID!, id_usuario: ID!): PreEditActividad!
        getActividad(id: ID!): Actividad!
        getActividadSedes(id_usuario: ID!, fecha_inicio: String!, fecha_fin: String!): [Actividad]
    }   

    type Mutation {
        createActividadAndSesiones(data: ActividadInput!): Actividad
        createActividad(data: ActividadInput!): RespuestaGrap
        updateActividad(id: ID!, data: ActividadInput!): Actividad
        deleteActividad(id: ID!): Boolean
    }
`;