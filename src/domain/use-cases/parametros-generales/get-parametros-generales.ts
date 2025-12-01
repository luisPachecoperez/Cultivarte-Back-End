import {
  ParametrosGenerales,
  ParametrosGeneralesRepository,
  RespuestaGrap,
} from '../../';

export interface GetParametrosGeneralesUseCase {
  execute(): Promise<ParametrosGenerales[] | RespuestaGrap>;
}

export class GetParametrosGeneralesUseCaseImpl
  implements GetParametrosGeneralesUseCase
{
  constructor(
    private readonly parametroGeneralRepository: ParametrosGeneralesRepository,
  ) {}

  execute(): Promise<ParametrosGenerales[] | RespuestaGrap> {
    return this.parametroGeneralRepository.getAll();
  }
}
