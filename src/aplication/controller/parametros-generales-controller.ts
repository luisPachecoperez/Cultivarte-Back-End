import { ParametrosGenerales,
         CreateParametroGeneralUseCase,
         DeleteParametroGeneralUseCase,
         GetParametroGeneralUseCase,
         GetParametrosGeneralesUseCase,
         UpdateParametroGeneralUseCase } from "../../domain";


export class ParametrosGeneralesController {
    constructor(
        private createParametroGeneralUseCase: CreateParametroGeneralUseCase,
        private getParametrosGeneralesUseCase: GetParametrosGeneralesUseCase,
        private getParametroGeneralUseCase: GetParametroGeneralUseCase,
        private updateParametroGeneralUseCase: UpdateParametroGeneralUseCase,
        private deleteParametroGeneralUseCase: DeleteParametroGeneralUseCase
    ) {}

    async createParametroGeneral( parametroGeneral: ParametrosGenerales ): Promise<ParametrosGenerales> {
        return this.createParametroGeneralUseCase.execute( parametroGeneral );
    }

    async getParametrosGenerales(): Promise<ParametrosGenerales[] | null> {
        return this.getParametrosGeneralesUseCase.execute();
    }

    async getParametroGeneral( id_parametro_general: string ): Promise<ParametrosGenerales | null> {
        return this.getParametroGeneralUseCase.execute( id_parametro_general );
    }

    async updateParametroGeneral( id_parametro_general: string, parametroGeneral: ParametrosGenerales ): Promise<ParametrosGenerales> {
        return this.updateParametroGeneralUseCase.execute( id_parametro_general, parametroGeneral );
    }

    async deleteParametroGeneral( id_parametro_general: string ): Promise<boolean> {
        return this.deleteParametroGeneralUseCase.execute( id_parametro_general );
    }
}