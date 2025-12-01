import { GetBeneficiariosSedeUseCaseImpl } from '../../../persona/get-beneficiarios-sede';
import { Persona, PersonaRepository, RespuestaGrap } from '../../../../';

describe('GetBeneficiariosSedeUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    getBenSedes: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetBeneficiariosSedeUseCaseImpl(personasRepository);

  const mockBeneficiarios: Persona[] = [
    { id_persona: '1', id_sede: 'A', nombre: 'Beneficiario 1' } as any,
    { id_persona: '2', id_sede: 'B', nombre: 'Beneficiario 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de beneficiarios correctamente', async () => {
    (
      personasRepository.getBenSedes as jest.Mock
    ).mockResolvedValueOnce(mockBeneficiarios);
    const result = await useCase.execute();
    expect(personasRepository.getBenSedes).toHaveBeenCalled();
    expect(result).toBe(mockBeneficiarios);
  });

  it('retorna respuesta de error', async () => {
    (
      personasRepository.getBenSedes as jest.Mock
    ).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute();
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (
      personasRepository.getBenSedes as jest.Mock
    ).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});
