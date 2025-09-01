
import { Poblacion,
         CreatePoblacionUseCase, 
         UpdatePoblacionUseCase, 
         DeletePoblacionUseCase, 
         GetPoblacionUseCase, 
         GetPoblacionesUseCase,
         RespuestaGrap               } from "../../domain";

export class PoblacionesController {    

    constructor(
        private readonly getPoblacionesUseCase: GetPoblacionesUseCase,
        private readonly getPoblacionUseCase: GetPoblacionUseCase,
        private readonly createPoblacionUseCase: CreatePoblacionUseCase,
        private readonly updatePoblacionUseCase: UpdatePoblacionUseCase,
        private readonly deletePoblacionUseCase: DeletePoblacionUseCase
    ) {}

    async getPoblaciones(): Promise<Poblacion[] | RespuestaGrap> {
        return this.getPoblacionesUseCase.execute();
    }

    async getPoblacion(id_poblacion: string): Promise<Poblacion | RespuestaGrap> {
        return this.getPoblacionUseCase.execute(id_poblacion);
    }

    async createPoblacion(poblacion: Poblacion): Promise<Poblacion | RespuestaGrap> {
        return this.createPoblacionUseCase.execute(poblacion);
    }

    async updatePoblacion(id_poblacion: string, poblacion: Poblacion): Promise<Poblacion | RespuestaGrap> {
        return this.updatePoblacionUseCase.execute(id_poblacion, poblacion);
    }

    async deletePoblacion(id_poblacion: string): Promise<RespuestaGrap> {
        return this.deletePoblacionUseCase.execute(id_poblacion);
    }
}