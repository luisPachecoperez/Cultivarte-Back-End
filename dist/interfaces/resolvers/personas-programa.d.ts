import { PersonaPrograma } from '../../domain';
export declare const personasProgramaResolvers: {
    Query: {
        getPersonaProgramaById: (_parent: unknown, args: {
            id_persona_programa: string;
        }) => Promise<import("../../domain").RespuestaGrap | PersonaPrograma>;
        getPersonaProgramas: () => Promise<import("../../domain").RespuestaGrap | PersonaPrograma[]>;
    };
    Mutation: {
        createPersonaPrograma: (_parent: unknown, args: {
            personaPrograma: PersonaPrograma;
        }) => Promise<import("../../domain").RespuestaGrap>;
        updatePersonaPrograma: (_parent: unknown, args: {
            id_persona_programa: string;
            personaPrograma: PersonaPrograma;
        }) => Promise<import("../../domain").RespuestaGrap>;
        deletePersonaPrograma: (_parent: unknown, args: {
            id_persona_programa: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
