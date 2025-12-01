import { CalendarioInput } from '../../domain';
export declare const calendarioFechaResolvers: {
    Query: {
        consultarFechaCalendario: (_: unknown, { input }: {
            input: CalendarioInput;
        }) => Promise<import("../../domain").RespuestaGrap | import("../../domain").Evento[]>;
    };
};
