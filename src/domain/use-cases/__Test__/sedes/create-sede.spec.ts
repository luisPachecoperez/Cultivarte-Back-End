import { CreateSedeUseCaseImpl } from '../../sedes/create-sede';
import { Sede } from '../../../entities/sede';
import { RespuestaGrap } from '../../../entities/respuesta';
import { SedeRepository } from '../../../repositories/sede-repository';

describe('CreateSedeUseCaseImpl', () => {
  const sedeRepository: SedeRepository = {
    create: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new CreateSedeUseCaseImpl(sedeRepository);

  const mockSede: Sede = { id: '1', nombre: 'Sede Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna Sede correctamente', async () => {
    (sedeRepository.create as jest.Mock).mockResolvedValueOnce(mockSede);
    const result = await useCase.execute(mockSede);
    expect(sedeRepository.create).toHaveBeenCalledWith(mockSede);
    expect(result).toBe(mockSede);
  });

  it('retorna respuesta de error', async () => {
    (sedeRepository.create as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(mockSede);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sedeRepository.create as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute(mockSede)).rejects.toThrow('DB error');
  });
});