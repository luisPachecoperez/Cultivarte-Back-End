import { SedesController } from '../../aplication/controller/sedes-controller';
import { Sede } from '../../domain';
export declare const controller: SedesController;
export declare const sedeResolvers: {
    Query: {
        getSedes: () => Promise<import("../../domain").RespuestaGrap | Sede[]>;
        getSedeById: (_: any, args: {
            id_sede: string;
        }) => Promise<import("../../domain").RespuestaGrap | Sede>;
    };
    Mutation: {
        createSede: (_: any, args: {
            data: Sede;
        }) => Promise<import("../../domain").RespuestaGrap | Sede>;
        updateSede: (_: any, args: {
            id_sede: string;
            data: Sede;
        }) => Promise<import("../../domain").RespuestaGrap | Sede>;
        deleteSede: (_: any, args: {
            id_sede: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
