import { ParametroDetalle, ParametroDetalleRepository} from "../../";

export interface CreateParametroDetalleUseCase {
     execute( parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle>;
}

export class CreateParametroDetalleUseCaseImpl implements CreateParametroDetalleUseCase {
    constructor(
        private readonly parametroDetalleRepository: ParametroDetalleRepository
    ) {}

    execute( parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle> {
        return this.parametroDetalleRepository.create( parametroDetalle );
    }
}
    