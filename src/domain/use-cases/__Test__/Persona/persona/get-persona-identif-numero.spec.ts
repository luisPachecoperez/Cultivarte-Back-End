import { GetPersonaByTipoIdenficacionNumeroIdentificacionUseCaseImpl } from '../../../persona/get-persona-identif-numero';
import { Persona, PersonaRepository, RespuestaGrap } from '../../../../';

describe('GetPersonaByTipoIdentificacionNumeroIdentificacionUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    getPersonaByTipoIdenficacionNumeroIdentificacion: jest.fn(),
  } as unknown as PersonaRepository;

  const useCase = new GetPersonaByTipoIdenficacionNumeroIdentificacionUseCaseImpl(
    personasRepository,
  );

  const personaMock: Persona = {
    id_persona: '1',
    id_tipo_persona: 'TP',
    id_sexo: 'M',
    id_ubicacion: 'LOC',
    id_tipo_identificacion: 'CC',
    identificacion: '123',
  };

  const errorResponse: RespuestaGrap = {
    exitoso: 'N',
    mensaje: 'No encontrada',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return persona when repository resolves', async () => {
    (personasRepository.getPersonaByTipoIdenficacionNumeroIdentificacion as jest.Mock).mockResolvedValueOnce(
      personaMock,
    );

    const result = await useCase.execute('CC', '123');

    expect(personasRepository.getPersonaByTipoIdenficacionNumeroIdentificacion).toHaveBeenCalledWith(
      'CC',
      '123',
    );
    expect(result).toBe(personaMock);
  });

  it('should return error response when repository resolves with error', async () => {
    (personasRepository.getPersonaByTipoIdenficacionNumeroIdentificacion as jest.Mock).mockResolvedValueOnce(
      errorResponse,
    );

    const result = await useCase.execute('CC', '999');

    expect(result).toBe(errorResponse);
  });

  it('should propagate errors thrown by repository', async () => {
    (personasRepository.getPersonaByTipoIdenficacionNumeroIdentificacion as jest.Mock).mockRejectedValueOnce(
      new Error('DB down'),
    );

    await expect(useCase.execute('CC', '500')).rejects.toThrow('DB down');
  });
});
