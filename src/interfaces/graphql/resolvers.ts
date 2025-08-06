// src/interfaces/graphql/resolvers.ts
import { mergeResolvers } from '@graphql-tools/merge';

import { beneficiarioResolvers } from '../resolvers/beneficiario-resolvers';
import { parametroDetalleResolvers } from '../resolvers/parametro-detalle-resolvers';
import { parametrosGeneralesResolvers } from '../resolvers/parametros-generales-resolvers';
import { sesionResolvers } from '../resolvers/sesion-resolver';
import { sesionAsistenteResolvers } from '../resolvers/sesion-asistente-resolvers';
import { usuarioResolvers } from '../resolvers/usuario-resolver';
import { eventosResolvers } from '../resolvers/eventos-resolver';
import { parametriaEventosResolvers } from '../resolvers/parametria-eventos-resolvers';

export const resolvers = mergeResolvers([
  beneficiarioResolvers,
  parametroDetalleResolvers,
  parametrosGeneralesResolvers,
  sesionResolvers,
  sesionAsistenteResolvers,
  usuarioResolvers,
  eventosResolvers,
  parametriaEventosResolvers
]);
