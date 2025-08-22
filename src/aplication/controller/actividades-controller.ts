import { Actividad, ActividadRepository, PreCreateActividad, PreCreateActividadUseCase } from "../../domain";
import { CreateActividadUseCase, GetActividadesUseCase, GetActividadUseCase, UpdateActividadUseCase, DeleteActividadUseCase } from "../../domain";

export class ActividadesController {
    constructor(
        private readonly preCreateActividadUseCase: PreCreateActividadUseCase,
        private readonly createActividadUseCase: CreateActividadUseCase,
        private readonly getActividadesUseCase: GetActividadesUseCase,
        private readonly getActividadUseCase: GetActividadUseCase,
        private readonly updateActividadUseCase: UpdateActividadUseCase,
        private readonly deleteActividadUseCase: DeleteActividadUseCase
    ) {}

    async preCreateActividad( id_usuario: string ): Promise<PreCreateActividad> {
        return this.preCreateActividadUseCase.execute( id_usuario );
    }
    
    async createActividad( actividad: Actividad ): Promise<Actividad> {
        return this.createActividadUseCase.execute( actividad );
    }

    async getActividades(): Promise<Actividad[] | null> {
        return this.getActividadesUseCase.execute();
    }

    async getActividad( id_actividad: string ): Promise<Actividad | null> {
        return this.getActividadUseCase.execute( id_actividad );
    }

    async updateActividad( id_actividad: string, actividad: Actividad ): Promise<Actividad | null> {
        return this.updateActividadUseCase.execute( id_actividad, actividad );
    }

    async deleteActividad( id_actividad: string ): Promise<boolean> {
        return this.deleteActividadUseCase.execute( id_actividad );
    }
}