import { UpdatePersonaProgramaUseCaseImpl } from '../../personas-programa/update-persona-programa';
import {
  PersonaPrograma,
  PersonasProgramaRepository,
  RespuestaGrap,
} from '../../../';

describe('UpdatePersonaProgramaUseCaseImpl', () => {
  const personasProgramaRepository: PersonasProgramaRepository = {
    updateById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new UpdatePersonaProgramaUseCaseImpl(
    personasProgramaRepository,
  );

  const mockPersonaPrograma: PersonaPrograma = {
    id: '1',
    nombre: 'Programa Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Actualizado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama updateById con los argumentos correctos', async () => {
    (personasProgramaRepository.updateById as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    await useCase.execute('1', mockPersonaPrograma);
    expect(personasProgramaRepository.updateById).toHaveBeenCalledWith(
      '1',
      mockPersonaPrograma,
    );
  });

  it('retorna la respuesta del repositorio', async () => {
    (personasProgramaRepository.updateById as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('2', mockPersonaPrograma);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasProgramaRepository.updateById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3', mockPersonaPrograma)).rejects.toThrow(
      'DB error',
    );
  });
});
