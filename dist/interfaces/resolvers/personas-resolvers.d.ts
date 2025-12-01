import { Persona } from '../../domain';
export declare const personasResolvers: {
    Query: {
        getPersonas: (_: any, args: {
            limit: number;
            offset: number;
        }) => Promise<import("../../domain").RespuestaGrap | Persona[]>;
        getPersona: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap | Persona>;
        getAliadosSede: (_: any, args: {
            id_persona: string;
        }) => Promise<import("../../domain").RespuestaGrap | Persona[]>;
        getBeneficiariosSede: () => Promise<import("../../domain").RespuestaGrap | Persona[]>;
    };
    Mutation: {
        createPersona: (_: any, args: {
            data: Persona;
        }) => Promise<import("../../domain").RespuestaGrap | Persona>;
        updatePersona: (_: any, args: {
            id: string;
            data: Persona;
        }) => Promise<import("../../domain").RespuestaGrap | Persona>;
        deletePersona: (_: any, args: {
            id: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
