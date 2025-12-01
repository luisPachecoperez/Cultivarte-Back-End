import { PersonaGrupoInteres } from '../../domain';
export declare const personasGrupoInteresResolvers: {
    Query: {
        getPersonaGrupoInteresById: (_parent: unknown, args: {
            id_persona_grupo_interes: string;
        }) => Promise<import("../../domain").RespuestaGrap | PersonaGrupoInteres>;
        getPersonasGrupoInteres: () => Promise<import("../../domain").RespuestaGrap | PersonaGrupoInteres[]>;
    };
    Mutation: {
        createPersonaGrupoInteres: (_parent: unknown, args: {
            personaGrupoInteres: PersonaGrupoInteres;
        }) => Promise<import("../../domain").RespuestaGrap>;
        updatePersonaGrupoInteres: (_parent: unknown, args: {
            id_persona_grupo_interes: string;
            personaGrupoInteres: PersonaGrupoInteres;
        }) => Promise<import("../../domain").RespuestaGrap>;
        deletePersonaGrupoInteres: (_parent: unknown, args: {
            id_persona_grupo_interes: string;
        }) => Promise<import("../../domain").RespuestaGrap>;
    };
};
