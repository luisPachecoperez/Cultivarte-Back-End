import { CreateSesionUseCaseImpl } from '../../sesiones/create-sesion';
import { Sesion, SesionRepository, RespuestaGrap } from '../../../';

describe('CreateSesionUseCaseImpl', () => {
  const sesionRepository: SesionRepository = {
    createSesion: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new CreateSesionUseCaseImpl(sesionRepository);

  const mockSesion: Sesion = { id: '1', nombre: 'Sesion Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Creado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama createSesion con el argumento correcto', async () => {
    (sesionRepository.createSesion as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute(mockSesion);
    expect(sesionRepository.createSesion).toHaveBeenCalledWith(mockSesion);
  });

  it('retorna la respuesta del repositorio', async () => {
    (sesionRepository.createSesion as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(mockSesion);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sesionRepository.createSesion as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute(mockSesion)).rejects.toThrow('DB error');
  });
});