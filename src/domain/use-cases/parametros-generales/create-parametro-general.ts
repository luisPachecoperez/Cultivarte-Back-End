import { ParametrosGenerales, ParametrosGeneralesRepository } from "../../";

export interface CreateParametroGeneralUseCase {
    execute( parametrosGenerales: ParametrosGenerales ): Promise<ParametrosGenerales>;
}

export class CreateParametroGeneralUseCaseImpl implements CreateParametroGeneralUseCase {
    
    constructor( private repository: ParametrosGeneralesRepository ) {}

    async execute( parametrosGenerales: ParametrosGenerales ): Promise<ParametrosGenerales> {
        return this.repository.create( parametrosGenerales );
    }
}
