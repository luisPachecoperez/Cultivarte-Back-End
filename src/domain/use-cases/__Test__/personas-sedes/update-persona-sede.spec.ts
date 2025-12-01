import { UpdatePersonaSedeUseCaseImpl } from '../../personas-sedes/update-persona-sede';
import {
  PersonasSede,
  PersonasSedesRepository,
  RespuestaGrap,
} from '../../../';

describe('UpdatePersonaSedeUseCaseImpl', () => {
  let personaSedeRepository: jest.Mocked<PersonasSedesRepository>;
  let useCase: UpdatePersonaSedeUseCaseImpl;

  const mockPersonaSede: PersonasSede = {
    id_personas_sede: '1',
    id_persona: '1',
    id_sede: '1',
    id_creado_por: '1',
    fecha_creacion: new Date().toISOString(),
    id_modificado_por: '1',
    fecha_modificacion: new Date().toISOString(),
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Actualizado' };

  beforeEach(() => {
    personaSedeRepository = {
      updateById: jest.fn(),
      // otros métodos si tu interfaz los requiere
    } as unknown as jest.Mocked<PersonasSedesRepository>;
    useCase = new UpdatePersonaSedeUseCaseImpl(personaSedeRepository);
  });

  it('llama updateById con los argumentos correctos', async () => {
    personaSedeRepository.updateById.mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1', mockPersonaSede);
    expect(personaSedeRepository.updateById).toHaveBeenCalledWith(
      '1',
      mockPersonaSede,
    );
  });

  it('retorna la respuesta del repositorio', async () => {
    personaSedeRepository.updateById.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2', mockPersonaSede);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    personaSedeRepository.updateById.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3', mockPersonaSede)).rejects.toThrow(
      'DB error',
    );
  });
});
