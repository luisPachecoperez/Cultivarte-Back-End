import { CreateEventoUseCase,
         GetEventosUseCase,
         UpdateEventoUseCase,
         GetEventoUseCase,
         DeleteEventoUseCase,
         Evento } from "../../domain/index";


export class EventoController {

    constructor( private createEventoUseCase: CreateEventoUseCase,
        private getEventosUseCase: GetEventosUseCase, 
        private getEventoUseCase: GetEventoUseCase,
        private updateEventoUseCase: UpdateEventoUseCase,
        private deleteEventoUseCase: DeleteEventoUseCase 
    ) {}

    async createEvento( evento: Evento ): Promise<Evento> {
        return this.createEventoUseCase.execute( evento );
    }

    async getEventos(): Promise<Evento[]> {
        return this.getEventosUseCase.execute();
    }

    async getEvento( id_evento: string ): Promise<Evento | null> {
        return this.getEventoUseCase.execute( id_evento );
    }

    async updateEvento( id_evento: string, evento: Evento ): Promise<Evento> {
        return this.updateEventoUseCase.execute( id_evento, evento );
    }

    async deleteEvento( id_evento: string ): Promise<boolean> {
        return this.deleteEventoUseCase.execute( id_evento );
    }

}