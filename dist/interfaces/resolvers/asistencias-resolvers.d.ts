import { Asistencia, AsistenciaSesiones } from '../../domain';
export declare const asistenciasResolvers: {
    Query: {
        getAsistencias: () => Promise<import("../../domain").RespuestaGrap | Asistencia[]>;
        getAsistencia: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap | Asistencia>;
        getPreAsistencia: (_: any, args: {
            id_sesion: string;
        }) => Promise<import("../../domain").RespuestaGrap | import("../../domain").PreAsistencia>;
        getAsistenciasSede: (_: any, args: {
            id_usuario: string;
            fecha_inicio: string;
            fecha_fin: string;
        }) => Promise<import("../../domain").RespuestaGrap | Asistencia[]>;
    };
    Mutation: {
        createAsistencia: (_: any, args: {
            data: Asistencia;
        }) => Promise<import("../../domain").RespuestaGrap>;
        updateAsistencia: (_: any, args: {
            id: string;
            data: Asistencia;
        }) => Promise<import("../../domain").RespuestaGrap>;
        deleteAsistencia: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
        updateAsistencias: (_: any, args: {
            input: AsistenciaSesiones;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
