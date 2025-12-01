import { sedeResolvers } from '../sede-resolvers';
import { controller } from '../sede-resolvers';

describe('sedeResolvers', () => {
  it('debe definir los resolvers de Query y Mutation', () => {
    expect(sedeResolvers.Query.getSedes).toBeDefined();
    expect(sedeResolvers.Query.getSedeById).toBeDefined();
    expect(sedeResolvers.Mutation.createSede).toBeDefined();
    expect(sedeResolvers.Mutation.updateSede).toBeDefined();
    expect(sedeResolvers.Mutation.deleteSede).toBeDefined();
  });

  it('getSedes llama al método del controlador', async () => {
    const spy = jest.spyOn(controller, 'getAll').mockResolvedValue([]);
    await sedeResolvers.Query.getSedes();
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
    const spy = jest.spyOn(controller, 'getById').mockResolvedValue(sede);
    const args = { id_sede: '1' };
    await sedeResolvers.Query.getSedeById({}, args);
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
    const spy = jest.spyOn(controller, 'create').mockResolvedValue(sede);
    const args = { data: sede };
    await sedeResolvers.Mutation.createSede({}, args);
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
    const spy = jest.spyOn(controller, 'update').mockResolvedValue(sede);
    const args = { id_sede: '1', data: sede };
    await sedeResolvers.Mutation.updateSede({}, args);
    expect(spy).toHaveBeenCalledWith('1', sede);
    spy.mockRestore();
  });

  it('deleteSede llama al método del controlador', async () => {
  const mockRespuesta = { exitoso: 'S' as 'S', mensaje: 'Eliminado correctamente' };
  const spy = jest.spyOn(controller, 'delete').mockResolvedValue(mockRespuesta);
  const args = { id_sede: '1' };
  await sedeResolvers.Mutation.deleteSede({}, args);
  expect(spy).toHaveBeenCalledWith('1');
  spy.mockRestore();
  });
});
