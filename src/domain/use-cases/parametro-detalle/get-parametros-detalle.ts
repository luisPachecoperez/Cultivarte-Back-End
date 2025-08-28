import { ParametroDetalle, ParametroDetalleRepository } from "../../";

export interface GetParametrosDetalleUseCase {
    execute(): Promise<ParametroDetalle[]>;
}
    
export class GetParametrosDetalleUseCaseImpl implements GetParametrosDetalleUseCase {
    
    constructor(
        private readonly parametroDetalleRepository: ParametroDetalleRepository
    ) {}

    execute(): Promise<ParametroDetalle[]> {
        return this.parametroDetalleRepository.getAll();
    }
}