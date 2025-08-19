// src/interfaces/graphql/typeDefs.ts
import { gql } from 'graphql-tag';
import { parametroDetalleTypeDefs } from '../schema/parametros-detalle-schema';
import { parametroGeneralTypeDefs } from '../schema/parametros-generales-schema';
import { parametriaEventosTypeDefs } from '../schema/parametria-eventos-schema';

export const typeDefs = gql`
  ${parametroDetalleTypeDefs}
  ${parametroGeneralTypeDefs}
  ${parametriaEventosTypeDefs}
`;
