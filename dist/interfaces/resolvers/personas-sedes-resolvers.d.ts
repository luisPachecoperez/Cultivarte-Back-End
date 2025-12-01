import { PersonasSedesController } from '../../aplication/controller/personas-sedes-controller';
import { PersonasSede } from '../../domain/entities/personas-sede';
export declare const controller: PersonasSedesController;
export declare const personasSedesResolvers: {
    Query: {
        getPersonaSede: (_: any, args: {
            id_sede: string;
        }) => Promise<import("../../domain").RespuestaGrap | PersonasSede>;
        getPersonasSedes: () => Promise<import("../../domain").RespuestaGrap | PersonasSede[]>;
    };
    Mutation: {
        createPersonaSede: (_: any, args: {
            personasSede: PersonasSede;
        }) => Promise<import("../../domain").RespuestaGrap | PersonasSede>;
        updatePersonaSede: (_: any, args: {
            id_sede: string;
            personasSede: PersonasSede;
        }) => Promise<import("../../domain").RespuestaGrap | PersonasSede>;
        deletePersonaSede: (_: any, args: {
            id_sede: string;
        }) => Promise<import("../../domain").RespuestaGrap | PersonasSede>;
    };
};
