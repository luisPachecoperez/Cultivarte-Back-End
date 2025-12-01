import { ParametrosGenerales, ParametrosGeneralesRepository, RespuestaGrap } from '../../';
export interface CreateParametroGeneralUseCase {
    execute(parametrosGenerales: ParametrosGenerales): Promise<ParametrosGenerales | RespuestaGrap>;
}
export declare class CreateParametroGeneralUseCaseImpl implements CreateParametroGeneralUseCase {
    private readonly repository;
    constructor(repository: ParametrosGeneralesRepository);
    execute(parametrosGenerales: ParametrosGenerales): Promise<ParametrosGenerales | RespuestaGrap>;
}
