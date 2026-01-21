import { UpdateBeneficiariosUseCaseImpl } from '../../../persona/update-beneficiario';
import { PersonaRepository, RespuestaGrap } from '../../../../';
import { EditarBeneficiarios } from '../../../../entities/Editar-beneficiarios';

describe('UpdateBeneficiariosUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    updateBeneficiarios: jest.fn(),
  } as unknown as PersonaRepository;

  const useCase = new UpdateBeneficiariosUseCaseImpl(personasRepository);

  const payload: EditarBeneficiarios = {
    id_programa: '10',
    id_grupo_interes: '20',
    nuevos: [],
    modificados: [],
    eliminados: [],
  };

  const successResponse: RespuestaGrap = {
    exitoso: 'S',
    mensaje: 'Actualizado',
  };

  const errorResponse: RespuestaGrap = {
    exitoso: 'N',
    mensaje: 'Error',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return success response when repository resolves', async () => {
    (personasRepository.updateBeneficiarios as jest.Mock).mockResolvedValueOnce(
      successResponse,
    );

    const result = await useCase.execute(payload);

    expect(personasRepository.updateBeneficiarios).toHaveBeenCalledWith(
      payload,
    );
    expect(result).toBe(successResponse);
  });

  it('should return error response when repository resolves with failure', async () => {
    (personasRepository.updateBeneficiarios as jest.Mock).mockResolvedValueOnce(
      errorResponse,
    );

    const result = await useCase.execute(payload);

    expect(result).toBe(errorResponse);
  });

  it('should propagate errors thrown by repository', async () => {
    (personasRepository.updateBeneficiarios as jest.Mock).mockRejectedValueOnce(
      new Error('DB down'),
    );

    await expect(useCase.execute(payload)).rejects.toThrow('DB down');
  });
});
