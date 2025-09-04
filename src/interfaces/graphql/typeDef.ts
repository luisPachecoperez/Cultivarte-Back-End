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
import { sedeTypeDefs } from '../schema/sede-schema';
import { personaSedeTypeDefs } from '../schema/persona-sede-schema';
import { personasGrupoInteresTypeDefs } from '../schema/personas-grupo-interes-schema';
import { personasProgramaSchema } from '../schema/personas-programa-schema';

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
  ${sedeTypeDefs}
  ${personaSedeTypeDefs}
  ${personasGrupoInteresTypeDefs}
  ${personasProgramaSchema}
`;
