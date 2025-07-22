import { ParametrosGenerales, ParametrosGeneralesRepository } from "../../";

export interface GetParametrosGeneralesUseCase {
    execute(): Promise<ParametrosGenerales[] | null>;
}
    
export class GetParametrosGeneralesUseCaseImpl implements GetParametrosGeneralesUseCase {
    constructor(
        private readonly parametroGeneralRepository: ParametrosGeneralesRepository
    ) {}

    execute(): Promise<ParametrosGenerales[] | null> {
        return this.parametroGeneralRepository.getAll();
    }
}