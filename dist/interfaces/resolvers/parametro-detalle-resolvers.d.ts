import { ParametroDetalle } from '../../domain';
export declare const parametroDetalleResolvers: {
    Query: {
        getParametrosDetalle: () => Promise<import("../../domain").RespuestaGrap | ParametroDetalle[]>;
        getParametroDetalle: (_: any, args: {
            id: string;
        }) => Promise<ParametroDetalle | import("../../domain").RespuestaGrap>;
    };
    Mutation: {
        createParametroDetalle: (_: any, args: {
            data: ParametroDetalle;
        }) => Promise<ParametroDetalle | import("../../domain").RespuestaGrap>;
        updateParametroDetalle: (_: any, args: {
            id: string;
            data: ParametroDetalle;
        }) => Promise<ParametroDetalle | import("../../domain").RespuestaGrap>;
        deleteParametroDetalle: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
