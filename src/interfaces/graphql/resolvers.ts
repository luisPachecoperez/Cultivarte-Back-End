// src/interfaces/graphql/resolvers.ts
import { mergeResolvers } from '@graphql-tools/merge';

import { parametroDetalleResolvers } from '../resolvers/parametro-detalle-resolvers';
import { parametrosGeneralesResolvers } from '../resolvers/parametros-generales-resolvers';
import { parametriaEventosResolvers } from '../resolvers/parametria-eventos-resolvers';
import { calendarioFechaResolvers } from '../resolvers/calendario-fecha-resolvers';
import { actividadesResolvers } from '../resolvers/actividades-resolvers';
import { sesionesResolvers } from '../resolvers/sesiones-resolver';
import { asistenciasResolvers } from '../resolvers/asistencias-resolvers';
import { personasResolvers } from '../resolvers/personas-resolvers';

export const resolvers = mergeResolvers([
  parametroDetalleResolvers,
  parametrosGeneralesResolvers,
  parametriaEventosResolvers,
  calendarioFechaResolvers,
  actividadesResolvers,
  sesionesResolvers,
  asistenciasResolvers,
  personasResolvers
]);
