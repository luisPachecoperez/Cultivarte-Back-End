import { EventoRepositoryImpl } from './../../infrastructure/repositories/evento-repository-impl';
import { EventoDataSourceImpl } from "../../infrastructure/datasource/evento-datasource-impl";
import { CreateEventoUseCaseImpl, DeleteEventoUseCaseImpl, Evento, GetEventosUseCaseImpl, GetEventoUseCaseImpl, UpdateEventoUseCaseImpl } from '../../domain';
import { EventoController } from '../../aplication/controller/evento-controller';

const dataSource = new EventoDataSourceImpl();
const repository = new EventoRepositoryImpl( dataSource );
const useCaseGetById = new GetEventoUseCaseImpl( repository );
const useCaseGetAll = new GetEventosUseCaseImpl( repository );
const useCaseCreate = new CreateEventoUseCaseImpl( repository );
const useCaseUpdate = new UpdateEventoUseCaseImpl( repository );
const useCaseDelete = new DeleteEventoUseCaseImpl( repository );
const controller = new EventoController( useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete );

export const resolvers = {
    Query: {
        eventos: () => controller.getEventos(),
        evento: (_: any, args: { id: string }) => controller.getEvento(args.id),
    },
    Mutation: {
        createEvento: (_: any, args: { data: Evento }) => controller.createEvento(args.data),
        updateEvento: (_: any, args: { id: string, data: Evento }) => controller.updateEvento(args.data),
        deleteEvento: (_: any, args: { id: string }) => controller.deleteEvento(args.id),
    }
}