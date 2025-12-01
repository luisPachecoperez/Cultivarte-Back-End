import { ParametrosGenerales } from '../../domain';
export declare const parametrosGeneralesResolvers: {
    Query: {
        getParametrosGenerales: () => Promise<import("../../domain").RespuestaGrap | ParametrosGenerales[]>;
        getParametroGeneral: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap | ParametrosGenerales>;
    };
    Mutation: {
        createParametroGeneral: (_: any, args: {
            data: ParametrosGenerales;
        }) => Promise<import("../../domain").RespuestaGrap | ParametrosGenerales>;
        updateParametroGeneral: (_: any, args: {
            id: string;
            data: ParametrosGenerales;
        }) => Promise<import("../../domain").RespuestaGrap>;
        deleteParametroGeneral: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
