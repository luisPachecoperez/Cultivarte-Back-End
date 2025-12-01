import { Actividad } from '../../domain';
import { ActividadesController } from '../../aplication/controller/actividades-controller';
declare const controller: ActividadesController;
export declare const actividadesResolvers: {
    Query: {
        getActividades: (_: any, args: {
            limit: number;
            offset: number;
        }) => Promise<import("../../domain").RespuestaGrap | Actividad[]>;
        getActividad: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap | Actividad>;
        getPreCreateActividad: (_: any, args: {
            id_usuario: string;
        }) => Promise<import("../../domain").RespuestaGrap | import("../../domain").PreCreateActividad>;
        getPreEditActividad: (_: any, args: {
            id_actividad: string;
            id_usuario: string;
        }) => Promise<import("../../domain").RespuestaGrap | import("../../domain").PreEditActividad>;
        getActividadSedes: (_: any, args: {
            id_usuario: string;
            fecha_inicio: string;
            fecha_fin: string;
        }) => Promise<Actividad[] | {
            exitoso: string;
            mensaje: string;
        }>;
    };
    Mutation: {
        createActividadAndSesiones: (_: any, args: {
            data: Actividad;
        }) => Promise<Actividad | {
            exitoso: string;
            mensaje: string;
        }>;
        createActividad: (_: any, args: {
            data: Actividad;
        }) => Promise<import("../../domain").RespuestaGrap | Actividad>;
        updateActividad: (_: any, args: {
            id_actividad: string;
            data: Actividad;
        }) => Promise<Actividad | {
            exitoso: string;
            mensaje: string;
        }>;
        deleteActividad: (_: any, args: {
            id_actividad: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
export { controller };
