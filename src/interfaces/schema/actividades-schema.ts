import { gql } from "graphql-tag";

export const actividadesTypeDefs = gql`
    type Item {
        id: ID!
        nombre: String!
    }

    type NombreEvento {
        id_parametro_detalle: ID!
        nombre: String!
    }

    type PreCreateEvent {
        id_programa: ID!
        sedes: [Item!]!
        tiposDeEvento: [Item!]!
        aliados: [Item!]!
        responsables: [Item!]!
        nombreDeEventos: [NombreEvento!]!
        frecuencias: [Item!]!
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
        fecha_actividad_desde: String
        fecha_actividad_hasta: String
        plazo_asistencia: String
        estado: String
        id_creado_por: ID
        fecha_creacion: String
        id_modificado_por: ID
        fecha_modificacion: String
    }

    input ActividadInput {
        id_programa: ID!
        id_tipo_actividad: ID!
        id_responsable: ID!
        id_aliado: ID!
        id_sede: ID!
        id_frecuencia: ID
        institucional: String!
        nombre_actividad: String!
        descripcion: String!
        fecha_actividad_desde: String
        fecha_actividad_hasta: String
        plazo_asistencia: String
        estado: String
        id_creado_por: ID
        fecha_creacion: String
        id_modificado_por: ID
        fecha_modificacion: String
    }
        
    type Query {
        getActividades: [Actividad!]!
        getPreCreateActividad(id_usuario: ID!): PreCreateEvent!
        getActividad(id: ID!): Actividad!
    }   

    type Mutation {
        createActividad(data: ActividadInput!): Actividad
        updateActividad(id: ID!, data: ActividadInput!): Actividad
        deleteActividad(id: ID!): Boolean
    }
`;