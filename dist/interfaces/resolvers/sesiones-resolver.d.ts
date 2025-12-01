import { Sesion, EditarSesiones } from '../../domain';
import { SesionesController } from '../../aplication/controller/sesiones-controller';
export declare const controller: SesionesController;
export declare const sesionesResolvers: {
    Query: {
        getSesiones: (_: any, args: {
            limit: number;
            offset: number;
        }) => Promise<import("../../domain").RespuestaGrap | Sesion[]>;
        getSesion: (_: any, args: {
            id_sesion: string;
        }) => Promise<import("../../domain").RespuestaGrap | Sesion>;
        getSesionesSedes: (_: any, args: {
            id_usuario: string;
            fecha_inicio: string;
            fecha_fin: string;
        }) => Promise<import("../../domain").RespuestaGrap | Sesion[]>;
    };
    Mutation: {
        createSesion: (_: any, args: {
            input: Sesion;
        }) => Promise<import("../../domain").RespuestaGrap>;
        updateSesion: (_: any, args: {
            input: Sesion;
        }) => Promise<import("../../domain").RespuestaGrap>;
        deleteSesion: (_: any, args: {
            id_sesion: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
        updateSesiones: (_: any, args: {
            input: EditarSesiones;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
