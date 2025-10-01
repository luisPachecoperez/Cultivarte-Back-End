// src/interfaces/graphql/resolvers.ts
import { mergeResolvers } from "@graphql-tools/merge";

import { parametroDetalleResolvers } from "../resolvers/parametro-detalle-resolvers";
import { parametrosGeneralesResolvers } from "../resolvers/parametros-generales-resolvers";
import { parametriaEventosResolvers } from "../resolvers/parametria-eventos-resolvers";
import { calendarioFechaResolvers } from "../resolvers/calendario-fecha-resolvers";
import { actividadesResolvers } from "../resolvers/actividades-resolvers";
import { sesionesResolvers } from "../resolvers/sesiones-resolver";
import { asistenciasResolvers } from "../resolvers/asistencias-resolvers";
import { personasResolvers } from "../resolvers/personas-resolvers";
import { poblacionesResolvers } from "../resolvers/poblaciones-resolvers";
import { sedeResolvers } from "../resolvers/sede-resolvers";
import { personasSedesResolvers } from "../resolvers/personas-sedes-resolvers";
import { personasGrupoInteresResolvers } from "../resolvers/personas-grupo-interes-resolver";
import { personasProgramaResolvers } from "../resolvers/personas-programa";

export const resolvers = mergeResolvers([
  parametroDetalleResolvers,
  parametrosGeneralesResolvers,
  parametriaEventosResolvers,
  calendarioFechaResolvers,
  actividadesResolvers,
  sesionesResolvers,
  asistenciasResolvers,
  personasResolvers,
  poblacionesResolvers,
  sedeResolvers,
  personasSedesResolvers,
  personasGrupoInteresResolvers,
  personasProgramaResolvers,
]);
