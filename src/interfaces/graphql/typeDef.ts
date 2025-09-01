// src/interfaces/graphql/typeDefs.ts
import { gql } from 'graphql-tag';
import { parametroDetalleTypeDefs } from '../schema/parametros-detalle-schema';
import { parametroGeneralTypeDefs } from '../schema/parametros-generales-schema';
import { parametriaEventosTypeDefs } from '../schema/parametria-eventos-schema';
import { calendarioFechaTypeDefs } from '../schema/calendario-fecha-schema';
import { actividadesTypeDefs } from '../schema/actividades-schema';
import { sesionesTypeDefs } from '../schema/sesiones-schema';
import { asistenciasTypeDefs } from '../schema/asistencias-schema';
import { personaTypeDefs } from '../schema/personas-schema';
import { poblacionTypeDefs } from '../schema/poblaciones-schema';

export const typeDefs = gql`
  ${parametroDetalleTypeDefs}
  ${parametroGeneralTypeDefs}
  ${parametriaEventosTypeDefs}
  ${calendarioFechaTypeDefs}
  ${actividadesTypeDefs}
  ${sesionesTypeDefs}
  ${asistenciasTypeDefs}
  ${personaTypeDefs}
  ${poblacionTypeDefs}
`;
