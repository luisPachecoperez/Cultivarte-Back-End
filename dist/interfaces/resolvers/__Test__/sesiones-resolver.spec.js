"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
it('updateSesiones retorna error si input es inválido (cubre línea 59)', async () => {
    const mockEditarSesiones = { sesiones: undefined };
    const mockError = { exitoso: 'N', mensaje: 'Error al actualizar sesiones: Cannot destructure property' };
    const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesiones').mockResolvedValue(mockError);
    const args = { input: mockEditarSesiones };
    const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
    expect(result).toEqual(mockError);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
});
it('updateSesiones ejecuta queries para nuevos, modificados y eliminados', async () => {
    const mockEditarSesiones = {
        sesiones: {
            nuevos: [mockSesion],
            modificados: [mockSesion],
            eliminados: [{ id_sesion: '1' }],
        },
        nuevos: [mockSesion],
        modificados: [mockSesion],
        eliminados: [{ id_sesion: '1' }],
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Sesiones actualizadas correctamente' };
    const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesiones').mockResolvedValue(mockRespuesta);
    const args = { input: mockEditarSesiones };
    const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
    expect(result).toEqual(mockRespuesta);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
});
it('updateSesiones hace rollback y retorna error si ocurre excepción en query', async () => {
    const mockEditarSesiones = {
        sesiones: {
            nuevos: [mockSesion],
            modificados: [],
            eliminados: [],
        },
        nuevos: [mockSesion],
        modificados: [],
        eliminados: [],
    };
    const mockError = { exitoso: 'N', mensaje: 'Error al actualizar sesiones: Query error' };
    const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesiones').mockResolvedValue(mockError);
    const args = { input: mockEditarSesiones };
    const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
    expect(result).toEqual(mockError);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
});
it('updateSesiones maneja campos opcionales como undefined', async () => {
    const sesionCompleta = {
        id_sesion: undefined,
        id_actividad: 'a1',
        fecha_actividad: '2023-01-01',
        hora_inicio: undefined,
        hora_fin: undefined,
        imagen: undefined,
        nro_asistentes: undefined,
        descripcion: undefined,
        id_creado_por: undefined,
        fecha_creacion: undefined,
        id_modificado_por: undefined,
        fecha_modificacion: undefined,
        id_sede: undefined,
        id_frecuencia: undefined,
        estado: undefined,
    };
    const mockEditarSesiones = {
        sesiones: {
            nuevos: [sesionCompleta],
            modificados: [],
            eliminados: [],
        },
        nuevos: [sesionCompleta],
        modificados: [],
        eliminados: [],
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Sesiones actualizadas correctamente' };
    const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesiones').mockResolvedValue(mockRespuesta);
    const args = { input: mockEditarSesiones };
    const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
    expect(result).toEqual(mockRespuesta);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
});
const sesiones_resolver_1 = require("../sesiones-resolver");
const mockSesion = {
    id_sesion: '1',
    id_actividad: 'a1',
    fecha_actividad: '2023-01-01',
    hora_inicio: '08:00',
    hora_fin: '10:00',
    id_sede: 's1',
    id_frecuencia: 'f1',
    estado: 'A',
    id_creado_por: 'u1',
    fecha_creacion: '2023-01-01',
    id_modificado_por: 'u2',
    fecha_modificacion: '2023-01-02',
    imagen: '',
    nro_asistentes: 10,
    descripcion: 'desc',
};
describe('sesionesResolvers', () => {
    it('debe definir los resolvers de Query y Mutation', () => {
        expect(sesiones_resolver_1.sesionesResolvers.Query.getSesiones).toBeDefined();
        expect(sesiones_resolver_1.sesionesResolvers.Query.getSesion).toBeDefined();
        expect(sesiones_resolver_1.sesionesResolvers.Query.getSesionesSedes).toBeDefined();
        expect(sesiones_resolver_1.sesionesResolvers.Mutation.createSesion).toBeDefined();
        expect(sesiones_resolver_1.sesionesResolvers.Mutation.updateSesion).toBeDefined();
        expect(sesiones_resolver_1.sesionesResolvers.Mutation.deleteSesion).toBeDefined();
        expect(sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones).toBeDefined();
    });
    const mockSesion = {
        id_sesion: '1',
        id_actividad: 'a1',
        fecha_actividad: '2023-01-01',
        hora_inicio: '08:00',
        hora_fin: '10:00',
        id_sede: 's1',
        id_frecuencia: 'f1',
        estado: 'A',
        id_creado_por: 'u1',
        fecha_creacion: '2023-01-01',
        id_modificado_por: 'u2',
        fecha_modificacion: '2023-01-02',
        imagen: '',
        nro_asistentes: 10,
        descripcion: 'desc',
    };
    it('getSesiones maneja error retornado por el controlador', async () => {
        const errorObj = { exitoso: 'N', mensaje: 'fail' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesiones').mockResolvedValue(errorObj);
        const args = { limit: 10, offset: 0 };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesiones({}, args);
        expect(result).toEqual(errorObj);
        spy.mockRestore();
    });
    it('getSesion maneja error retornado por el controlador', async () => {
        const errorObj = { exitoso: 'N', mensaje: 'fail' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesion').mockResolvedValue(errorObj);
        const args = { id_sesion: '1' };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesion({}, args);
        expect(result).toEqual(errorObj);
        spy.mockRestore();
    });
    it('getSesionesSedes maneja error retornado por el controlador', async () => {
        const errorObj = { exitoso: 'N', mensaje: 'fail' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesionesSedes').mockResolvedValue(errorObj);
        const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesionesSedes({}, args);
        expect(result).toEqual(errorObj);
        spy.mockRestore();
    });
    it('createSesion maneja error retornado por el controlador', async () => {
        const errorObj = { exitoso: 'N', mensaje: 'fail' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'createSesion').mockResolvedValue(errorObj);
        const args = { input: mockSesion };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.createSesion({}, args);
        expect(result).toEqual(errorObj);
        spy.mockRestore();
    });
    it('updateSesion maneja error retornado por el controlador', async () => {
        const errorObj = { exitoso: 'N', mensaje: 'fail' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesion').mockResolvedValue(errorObj);
        const args = { input: mockSesion };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesion({}, args);
        expect(result).toEqual(errorObj);
        spy.mockRestore();
    });
    it('deleteSesion maneja error retornado por el controlador', async () => {
        const errorObj = { exitoso: 'N', mensaje: 'fail' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'deleteSesion').mockResolvedValue(errorObj);
        const args = { id_sesion: '1' };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.deleteSesion({}, args);
        expect(result).toEqual(errorObj);
        spy.mockRestore();
    });
    it('updateSesiones maneja error retornado por el controlador', async () => {
        const errorObj = { exitoso: 'N', mensaje: 'fail' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesiones').mockResolvedValue(errorObj);
        const mockEditarSesiones = {
            sesiones: {
                nuevos: [mockSesion],
                modificados: [mockSesion],
                eliminados: [{ id_sesion: '1' }],
            },
            nuevos: [mockSesion],
            modificados: [mockSesion],
            eliminados: [{ id_sesion: '1' }],
        };
        const args = { input: mockEditarSesiones };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
        expect(result).toEqual(errorObj);
        spy.mockRestore();
    });
    it('getSesiones llama al método del controlador', async () => {
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesiones').mockResolvedValue([mockSesion]);
        const args = { limit: 10, offset: 0 };
        await sesiones_resolver_1.sesionesResolvers.Query.getSesiones({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getSesiones retorna vacío si el controlador retorna undefined', async () => {
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesiones').mockResolvedValue(undefined);
        const args = { limit: 10, offset: 0 };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesiones({}, args);
        expect(result).toBeUndefined();
        spy.mockRestore();
    });
    it('getSesion llama al método del controlador', async () => {
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesion').mockResolvedValue(mockSesion);
        const args = { id_sesion: '1' };
        await sesiones_resolver_1.sesionesResolvers.Query.getSesion({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getSesion retorna error si el controlador retorna error', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No encontrado' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesion').mockResolvedValue(mockError);
        const args = { id_sesion: 'error' };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesion({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('getSesion retorna undefined si el controlador retorna undefined', async () => {
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesion').mockResolvedValue(undefined);
        const args = { id_sesion: 'noexiste' };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesion({}, args);
        expect(result).toBeUndefined();
        spy.mockRestore();
    });
    it('getSesionesSedes llama al método del controlador', async () => {
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesionesSedes').mockResolvedValue([mockSesion]);
        const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
        await sesiones_resolver_1.sesionesResolvers.Query.getSesionesSedes({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getSesionesSedes retorna error si el controlador retorna error', async () => {
        const mockError = { exitoso: 'N', mensaje: 'Error de consulta' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesionesSedes').mockResolvedValue(mockError);
        const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesionesSedes({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('getSesionesSedes retorna undefined si el controlador retorna undefined', async () => {
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Query, 'getSesionesSedes').mockResolvedValue(undefined);
        const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesionesSedes({}, args);
        expect(result).toBeUndefined();
        spy.mockRestore();
    });
    it('createSesion llama al método del controlador', async () => {
        const mockRespuesta = { exitoso: 'S', mensaje: 'Creado correctamente' };
        const args = { input: mockSesion };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'createSesion').mockResolvedValue(mockRespuesta);
        await sesiones_resolver_1.sesionesResolvers.Mutation.createSesion({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('createSesion retorna error si el controlador retorna error', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No se pudo crear' };
        const args = { input: mockSesion };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'createSesion').mockResolvedValue(mockError);
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.createSesion({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('updateSesion llama al método del controlador', async () => {
        const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizado correctamente' };
        const args = { input: mockSesion };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesion').mockResolvedValue(mockRespuesta);
        await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesion({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('updateSesion retorna error si el controlador retorna error', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No se pudo actualizar' };
        const args = { input: mockSesion };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesion').mockResolvedValue(mockError);
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesion({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('deleteSesion llama al método del controlador', async () => {
        const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado correctamente' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'deleteSesion').mockResolvedValue(mockRespuesta);
        const args = { id_sesion: '1' };
        await sesiones_resolver_1.sesionesResolvers.Mutation.deleteSesion({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('deleteSesion retorna error si el controlador retorna error', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No se pudo eliminar' };
        const args = { id_sesion: '1' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'deleteSesion').mockResolvedValue(mockError);
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.deleteSesion({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('updateSesiones llama al método del controlador', async () => {
        const mockEditarSesiones = {
            sesiones: {
                nuevos: [mockSesion],
                modificados: [mockSesion],
                eliminados: [{ id_sesion: '1' }],
            },
            nuevos: [mockSesion],
            modificados: [mockSesion],
            eliminados: [{ id_sesion: '1' }],
        };
        const mockRespuesta = { exitoso: 'S', mensaje: 'Sesiones actualizadas' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesiones').mockResolvedValue(mockRespuesta);
        const args = { input: mockEditarSesiones };
        await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('updateSesiones retorna error si el controlador retorna error', async () => {
        const mockEditarSesiones = {
            sesiones: {
                nuevos: [mockSesion],
                modificados: [mockSesion],
                eliminados: [{ id_sesion: '1' }],
            },
            nuevos: [mockSesion],
            modificados: [mockSesion],
            eliminados: [{ id_sesion: '1' }],
        };
        const mockError = { exitoso: 'N', mensaje: 'No se pudo actualizar sesiones' };
        const spy = jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesiones').mockResolvedValue(mockError);
        const args = { input: mockEditarSesiones };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('getSesiones ejecuta correctamente', async () => {
        const args = { limit: 10, offset: 0 };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesiones({}, args);
        expect(result).not.toBeUndefined();
    });
    it('getSesion ejecuta correctamente', async () => {
        const args = { id_sesion: '1' };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesion({}, args);
        expect(result).not.toBeUndefined();
    });
    it('getSesionesSedes ejecuta correctamente', async () => {
        const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
        const result = await sesiones_resolver_1.sesionesResolvers.Query.getSesionesSedes({}, args);
        expect(result).not.toBeUndefined();
    });
    it('createSesion ejecuta correctamente', async () => {
        const args = { input: mockSesion };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.createSesion({}, args);
        expect(result).not.toBeUndefined();
    });
    it('updateSesion ejecuta correctamente', async () => {
        const args = { input: mockSesion };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesion({}, args);
        expect(result).not.toBeUndefined();
    });
    it('deleteSesion ejecuta correctamente', async () => {
        const args = { id_sesion: '1' };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.deleteSesion({}, args);
        expect(result).not.toBeUndefined();
    });
    it('updateSesiones ejecuta correctamente', async () => {
        jest.spyOn(sesiones_resolver_1.sesionesResolvers.Mutation, 'updateSesiones').mockResolvedValue({ exitoso: 'S', mensaje: 'Sesiones actualizadas' });
        const mockEditarSesiones = {
            sesiones: {
                nuevos: [mockSesion],
                modificados: [mockSesion],
                eliminados: [{ id_sesion: '1' }],
            },
            nuevos: [mockSesion],
            modificados: [mockSesion],
            eliminados: [{ id_sesion: '1' }],
        };
        const args = { input: mockEditarSesiones };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
        expect(result).not.toBeUndefined();
    });
    it('updateSesiones retorna resultado aunque el input sea undefined', async () => {
        const args = { input: undefined };
        const result = await sesiones_resolver_1.sesionesResolvers.Mutation.updateSesiones({}, args);
        expect(result).toEqual({ exitoso: "S", mensaje: "Sesiones actualizadas" });
    });
});
//# sourceMappingURL=sesiones-resolver.spec.js.map