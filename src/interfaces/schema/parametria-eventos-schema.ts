import { gql } from "graphql-tag";

export const parametriaEventosTypeDefs = gql`
  type ParametroItem {
    id: ID!
    nombre: String!
  }

  type ParametriaEventos {
    Roles: [ParametroItem]
    Listado_de_contenidos: [ParametroItem]
    actividad_general: [ParametroItem]
    Programacion: [ParametroItem]
    Aliados: [ParametroItem]
    Tipo_de_evento: [ParametroItem]
  }

  type Query {
    GetParametriaEventos: ParametriaEventos
  }
`;
/*
export const parametriaEventosResolvers = {
  Query: {
    parametria_eventos: async () => {
      const data = await getParametriaEventos();

      // Mapeamos nombres con espacios a campos GraphQL válidos
      return {
        Roles: data["Roles"] || [],
        Listado_de_contenidos: data["Listado de contenidos"] || [],
        actividad_general: data["actividad general"] || [],
        Frecuencia: data["Frecuencia"] || [],
        Aliados: data["Aliados"] || []
      };
    }
  }
};*/