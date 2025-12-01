export { controller };
import { Poblacion } from '../../domain';
import { PoblacionesController } from '../../aplication/controller/poblaciones-controller';
declare const controller: PoblacionesController;
export declare const poblacionesResolvers: {
    Query: {
        getPoblaciones: () => Promise<import("../../domain").RespuestaGrap | Poblacion[]>;
        getPoblacion: (_: any, { id_poblacion }: {
            id_poblacion: string;
        }) => Promise<import("../../domain").RespuestaGrap | Poblacion>;
    };
    Mutation: {
        createPoblacion: (_: any, args: {
            input: Poblacion;
        }) => Promise<import("../../domain").RespuestaGrap | Poblacion>;
        updatePoblacion: (_: any, args: {
            id: string;
            input: Poblacion;
        }) => Promise<import("../../domain").RespuestaGrap | Poblacion>;
        deletePoblacion: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
