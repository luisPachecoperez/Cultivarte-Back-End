import { GetSedeUseCaseImpl } from '../../sedes/get-sede';
import { RespuestaGrap } from '../../../entities/respuesta';
import { SedeRepository } from '../../../repositories/sede-repository';
import { Sede } from '../../../entities/sede';

describe('GetSedeUseCaseImpl', () => {
  const sedeRepository: SedeRepository = {
    getById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetSedeUseCaseImpl(sedeRepository);

  const mockSede: Sede = { id: '1', nombre: 'Sede Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama getById con el id correcto', async () => {
    (sedeRepository.getById as jest.Mock).mockResolvedValueOnce(mockSede);
    const result = await useCase.execute('1');
    expect(sedeRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockSede);
  });

  it('retorna Sede correctamente', async () => {
    (sedeRepository.getById as jest.Mock).mockResolvedValueOnce(mockSede);
    const result = await useCase.execute('2');
    expect(result).toBe(mockSede);
  });

  it('retorna respuesta de error', async () => {
    (sedeRepository.getById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('3');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sedeRepository.getById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('4')).rejects.toThrow('DB error');
  });
});