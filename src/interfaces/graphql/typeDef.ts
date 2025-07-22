// src/interfaces/graphql/typeDefs.ts
import { gql } from 'graphql-tag';
import { beneficiarioTypeDefs } from '../schema/beneficiario-schema';
import { parametroDetalleTypeDefs } from '../schema/parametros-detalle-schema';
import { parametroGeneralTypeDefs } from '../schema/parametros-generales-schema';
import { sesionTypeDefs } from '../schema/sesion-schema';
import { sesionAsistenteTypeDefs } from '../schema/sesion-asistente-schema';
import { usuarioTypeDefs } from '../schema/usuario-schema';
import { eventoTypeDefs } from '../schema/evento-schema';

export const typeDefs = gql`
  ${beneficiarioTypeDefs}
  ${parametroDetalleTypeDefs}
  ${parametroGeneralTypeDefs}
  ${sesionTypeDefs}
  ${sesionAsistenteTypeDefs}
  ${usuarioTypeDefs}
  ${eventoTypeDefs}
`;
