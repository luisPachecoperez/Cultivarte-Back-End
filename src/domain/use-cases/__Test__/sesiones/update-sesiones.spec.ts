import { UpdateSesionesUseCaseImpl } from '../../sesiones/update-sesiones';
import { SesionRepository, EditarSesiones, RespuestaGrap } from '../../../';

describe('UpdateSesionesUseCaseImpl', () => {
  const sesionRepository: SesionRepository = {
    updateSesiones: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new UpdateSesionesUseCaseImpl(sesionRepository);

  const mockEditarSesiones: EditarSesiones = { id: '1', cambios: [] } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Actualizado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama updateSesiones con el argumento correcto', async () => {
    (sesionRepository.updateSesiones as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute(mockEditarSesiones);
    expect(sesionRepository.updateSesiones).toHaveBeenCalledWith(mockEditarSesiones);
  });

  it('retorna la respuesta del repositorio', async () => {
    (sesionRepository.updateSesiones as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(mockEditarSesiones);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sesionRepository.updateSesiones as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute(mockEditarSesiones)).rejects.toThrow('DB error');
  });
});