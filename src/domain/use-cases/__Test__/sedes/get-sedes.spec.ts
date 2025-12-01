import { GetSedesUseCaseImpl } from '../../sedes/get-sedes';
import { RespuestaGrap } from '../../../entities/respuesta';
import { Sede } from '../../../entities/sede';
import { SedeRepository } from '../../../repositories/sede-repository';

describe('GetSedesUseCaseImpl', () => {
  const sedeRepository: SedeRepository = {
    getAll: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetSedesUseCaseImpl(sedeRepository);

  const mockSedes: Sede[] = [
    { id: '1', nombre: 'Sede 1' } as any,
    { id: '2', nombre: 'Sede 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de Sede correctamente', async () => {
    (sedeRepository.getAll as jest.Mock).mockResolvedValueOnce(mockSedes);
    const result = await useCase.execute();
    expect(sedeRepository.getAll).toHaveBeenCalled();
    expect(result).toBe(mockSedes);
  });

  it('retorna respuesta de error', async () => {
    (sedeRepository.getAll as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute();
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sedeRepository.getAll as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});