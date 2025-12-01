import { UpdateSedeUseCaseImpl } from '../../sedes/update-sede';
import { RespuestaGrap } from '../../../entities/respuesta';
import { Sede } from '../../../entities/sede';
import { SedeRepository } from '../../../repositories/sede-repository';

describe('UpdateSedeUseCaseImpl', () => {
  const sedeRepository: SedeRepository = {
    updateById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new UpdateSedeUseCaseImpl(sedeRepository);

  const mockSede: Sede = { id: '1', nombre: 'Sede Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Actualizado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama updateById con los argumentos correctos', async () => {
    (sedeRepository.updateById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1', mockSede);
    expect(sedeRepository.updateById).toHaveBeenCalledWith('1', mockSede);
  });

  it('retorna la respuesta del repositorio', async () => {
    (sedeRepository.updateById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2', mockSede);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sedeRepository.updateById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('3', mockSede)).rejects.toThrow('DB error');
  });
});