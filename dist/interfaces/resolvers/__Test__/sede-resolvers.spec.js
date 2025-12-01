"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sede_resolvers_1 = require("../sede-resolvers");
const sede_resolvers_2 = require("../sede-resolvers");
describe('sedeResolvers', () => {
    it('debe definir los resolvers de Query y Mutation', () => {
        expect(sede_resolvers_1.sedeResolvers.Query.getSedes).toBeDefined();
        expect(sede_resolvers_1.sedeResolvers.Query.getSedeById).toBeDefined();
        expect(sede_resolvers_1.sedeResolvers.Mutation.createSede).toBeDefined();
        expect(sede_resolvers_1.sedeResolvers.Mutation.updateSede).toBeDefined();
        expect(sede_resolvers_1.sedeResolvers.Mutation.deleteSede).toBeDefined();
    });
    it('getSedes llama al método del controlador', async () => {
        const spy = jest.spyOn(sede_resolvers_2.controller, 'getAll').mockResolvedValue([]);
        await sede_resolvers_1.sedeResolvers.Query.getSedes();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getSedeById llama al método del controlador', async () => {
        const sede = {
            id_sede: '1',
            id_pais: 'CO',
            id_departamento: '05',
            id_ciudad: '001',
            id_regional_davivienda: 'RD',
            id_regional_seguros_bolivar: 'RSB',
            id_tipo_inmueble: 'TI',
            id_espacio: 'E1',
            id_uso_inmueble: 'UI',
            id_nivel_inmueble: 'NI',
            id_condicion_urbana: 'CU',
            id_clima: 'CL',
            id_condicion_inmueble: 'CI',
            nombre: 'Sede 1',
            numero_convenio: 'NC1',
            fecha_apertura_sede: '2023-01-01',
            matricula_inmobiliaria: 'MI1',
            id_creado_por: 'user1',
            fecha_creacion: '2023-01-01',
            id_modificado_por: 'user2',
            fecha_modificacion: '2023-01-02',
        };
        const spy = jest.spyOn(sede_resolvers_2.controller, 'getById').mockResolvedValue(sede);
        const args = { id_sede: '1' };
        await sede_resolvers_1.sedeResolvers.Query.getSedeById({}, args);
        expect(spy).toHaveBeenCalledWith('1');
        spy.mockRestore();
    });
    it('createSede llama al método del controlador', async () => {
        const sede = {
            id_sede: '1',
            id_pais: 'CO',
            id_departamento: '05',
            id_ciudad: '001',
            id_regional_davivienda: 'RD',
            id_regional_seguros_bolivar: 'RSB',
            id_tipo_inmueble: 'TI',
            id_espacio: 'E1',
            id_uso_inmueble: 'UI',
            id_nivel_inmueble: 'NI',
            id_condicion_urbana: 'CU',
            id_clima: 'CL',
            id_condicion_inmueble: 'CI',
            nombre: 'Sede 1',
            numero_convenio: 'NC1',
            fecha_apertura_sede: '2023-01-01',
            matricula_inmobiliaria: 'MI1',
            id_creado_por: 'user1',
            fecha_creacion: '2023-01-01',
            id_modificado_por: 'user2',
            fecha_modificacion: '2023-01-02',
        };
        const spy = jest.spyOn(sede_resolvers_2.controller, 'create').mockResolvedValue(sede);
        const args = { data: sede };
        await sede_resolvers_1.sedeResolvers.Mutation.createSede({}, args);
        expect(spy).toHaveBeenCalledWith(sede);
        spy.mockRestore();
    });
    it('updateSede llama al método del controlador', async () => {
        const sede = {
            id_sede: '1',
            id_pais: 'CO',
            id_departamento: '05',
            id_ciudad: '001',
            id_regional_davivienda: 'RD',
            id_regional_seguros_bolivar: 'RSB',
            id_tipo_inmueble: 'TI',
            id_espacio: 'E1',
            id_uso_inmueble: 'UI',
            id_nivel_inmueble: 'NI',
            id_condicion_urbana: 'CU',
            id_clima: 'CL',
            id_condicion_inmueble: 'CI',
            nombre: 'Sede 1',
            numero_convenio: 'NC1',
            fecha_apertura_sede: '2023-01-01',
            matricula_inmobiliaria: 'MI1',
            id_creado_por: 'user1',
            fecha_creacion: '2023-01-01',
            id_modificado_por: 'user2',
            fecha_modificacion: '2023-01-02',
        };
        const spy = jest.spyOn(sede_resolvers_2.controller, 'update').mockResolvedValue(sede);
        const args = { id_sede: '1', data: sede };
        await sede_resolvers_1.sedeResolvers.Mutation.updateSede({}, args);
        expect(spy).toHaveBeenCalledWith('1', sede);
        spy.mockRestore();
    });
    it('deleteSede llama al método del controlador', async () => {
        const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado correctamente' };
        const spy = jest.spyOn(sede_resolvers_2.controller, 'delete').mockResolvedValue(mockRespuesta);
        const args = { id_sede: '1' };
        await sede_resolvers_1.sedeResolvers.Mutation.deleteSede({}, args);
        expect(spy).toHaveBeenCalledWith('1');
        spy.mockRestore();
    });
});
//# sourceMappingURL=sede-resolvers.spec.js.map