import { GetPreBeneficiariosUseCaseImpl } from '../../../persona/get-pre-benificiarios';
import { PersonaRepository, RespuestaGrap } from '../../../../';
import { PreBeneficiario } from '../../../../entities/beneficiario';

describe('GetPreBeneficiariosUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    getPreBeneficiarios: jest.fn(),
  } as unknown as PersonaRepository;

  const useCase = new GetPreBeneficiariosUseCaseImpl(personasRepository);

  const preBeneficiariosMock: PreBeneficiario[] = [
    {
      id_programa: "1",
      id_grupo_interes: "2",
      sedes: [],
      paises: [],
      tiposIdentificacion: [],
      tiposPersona: [],
      sexo: [],
      ubicaciones: [],
    },
  ];

  const errorResponse: RespuestaGrap = {
    exitoso: 'N',
    mensaje: 'Error',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return pre-beneficiarios when repository resolves', async () => {
    (personasRepository.getPreBeneficiarios as jest.Mock).mockResolvedValueOnce(
      preBeneficiariosMock,
    );

    const result = await useCase.execute('user-1');

    expect(personasRepository.getPreBeneficiarios).toHaveBeenCalledWith(
      'user-1',
    );
    expect(result).toBe(preBeneficiariosMock);
  });

  it('should return error response when repository resolves with error', async () => {
    (personasRepository.getPreBeneficiarios as jest.Mock).mockResolvedValueOnce(
      errorResponse,
    );

    const result = await useCase.execute('user-2');

    expect(result).toBe(errorResponse);
  });

  it('should propagate errors thrown by repository', async () => {
    (personasRepository.getPreBeneficiarios as jest.Mock).mockRejectedValueOnce(
      new Error('DB down'),
    );

    await expect(useCase.execute('user-3')).rejects.toThrow('DB down');
  });
});
