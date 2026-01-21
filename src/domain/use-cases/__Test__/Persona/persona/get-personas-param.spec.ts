import { GetPersonasParamsUseCaseImpl } from '../../../persona/get-personas-param';
import { Persona, PersonaRepository, RespuestaGrap } from '../../../../';

describe('GetPersonasParamsUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    getPersonasParams: jest.fn(),
  } as unknown as PersonaRepository;

  const useCase = new GetPersonasParamsUseCaseImpl(personasRepository);

  const personasMock: Persona[] = [
    {
      id_persona: '1',
      id_tipo_persona: 'TP',
      id_sexo: 'M',
      id_ubicacion: 'LOC',
      id_tipo_identificacion: 'CC',
    },
  ];

  const errorResponse: RespuestaGrap = {
    exitoso: 'N',
    mensaje: 'Error',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return personas when repository resolves', async () => {
    (personasRepository.getPersonasParams as jest.Mock).mockResolvedValueOnce(
      personasMock,
    );

    const result = await useCase.execute('sede-1', 'prog-1', 'grp-1', 5, 10);

    expect(personasRepository.getPersonasParams).toHaveBeenCalledWith(
      'sede-1',
      'prog-1',
      'grp-1',
      5,
      10,
    );
    expect(result).toBe(personasMock);
  });

  it('should return error response when repository resolves with error', async () => {
    (personasRepository.getPersonasParams as jest.Mock).mockResolvedValueOnce(
      errorResponse,
    );

    const result = await useCase.execute('sede-1', 'prog-1', 'grp-1', 5, 10);

    expect(result).toBe(errorResponse);
  });

  it('should propagate errors thrown by repository', async () => {
    (personasRepository.getPersonasParams as jest.Mock).mockRejectedValueOnce(
      new Error('DB down'),
    );

    await expect(
      useCase.execute('sede-1', 'prog-1', 'grp-1', 5, 10),
    ).rejects.toThrow('DB down');
  });
});
