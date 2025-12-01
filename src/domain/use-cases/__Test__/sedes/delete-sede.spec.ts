import { DeleteSedeUseCaseImpl } from '../../sedes/delete-sede';
import { RespuestaGrap } from '../../../entities/respuesta';
import { SedeRepository } from '../../../repositories/sede-repository';

describe('DeleteSedeUseCaseImpl', () => {
  const sedeRepository: SedeRepository = {
    deleteById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new DeleteSedeUseCaseImpl(sedeRepository);

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Eliminado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama deleteById con el id correcto', async () => {
    (sedeRepository.deleteById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1');
    expect(sedeRepository.deleteById).toHaveBeenCalledWith('1');
  });

  it('retorna la respuesta del repositorio', async () => {
    (sedeRepository.deleteById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sedeRepository.deleteById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});