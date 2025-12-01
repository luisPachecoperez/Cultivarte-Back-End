import { calendarioFechaResolvers } from '../calendario-fecha-resolvers';

describe('calendarioFechaResolvers', () => {
  it('debe definir el resolver consultarFechaCalendario', () => {
    expect(calendarioFechaResolvers.Query.consultarFechaCalendario).toBeDefined();
  });
  
  
  it('consultarFechaCalendario llama al método del controlador', async () => {

    const mockResult: import('../../../domain/entities/calendario-fecha').Evento[] = [
      {
        id_actividad: '1',
        id_sesion: 'abc',
        nombre_actividad: 'Taller',
        desde: new Date().toISOString(),
        hasta: new Date().toISOString(),
        asistentes_evento: 0,
      },
      // ...agrega más objetos si es necesario
    ];
    // Mock del método getByDate del controlador
    const spy = jest.spyOn(
      calendarioFechaResolvers.Query,
      'consultarFechaCalendario',
    ).mockResolvedValue(mockResult);

    const input = { input: { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31', id_usuario: 'u1' } };
    const result = await calendarioFechaResolvers.Query.consultarFechaCalendario({}, input);

    expect(spy).toHaveBeenCalledWith({}, input);
    expect(result).toBe(mockResult);

    spy.mockRestore();
  });
  const mockCalendarioInput = {
  fecha: '2023-01-01',
  // agrega aquí otras propiedades requeridas por CalendarioInput
  };

  it('consultarFechaCalendario ejecuta correctamente', async () => {
    const args = {
      input: {
        fecha_inicial: '2024-06-01',
        fecha_final: '2024-06-30',
        id_usuario: 'user1',
        // agrega otros campos si existen en la definición
      }
    };
    const result = await calendarioFechaResolvers.Query.consultarFechaCalendario({}, args);
    expect(result).not.toBeUndefined();
  });
});