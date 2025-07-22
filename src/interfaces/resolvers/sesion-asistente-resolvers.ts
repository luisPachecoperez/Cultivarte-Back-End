
import { GetSesionesAsistentesUseCaseImpl,
         GetSesionAsistenteUseCaseImpl,
         SesionAsistente,
         CreateSesionAsistenteUseCaseImpl,
         UpdateSesionAsistenteUseCaseImpl,
         DeleteSesionAsistenteUseCaseImpl} from "../../domain";
import { SesionAsistenteController } from "../../aplication/controller/sesion-asistente-controller";
import { SesionAsistenteRepositoryImpl } from "../../infrastructure/repositories/sesion-asistente-repository-impl";
import { SesionAsistenteDataSourceImpl } from "../../infrastructure/datasource/sesion-asistente-datasource-impl";

const dataSource = new SesionAsistenteDataSourceImpl();
const repository = new SesionAsistenteRepositoryImpl( dataSource );
const useCaseGetById = new GetSesionAsistenteUseCaseImpl(  repository );
const useCaseGetAll = new GetSesionesAsistentesUseCaseImpl( repository );
const useCaseCreate = new CreateSesionAsistenteUseCaseImpl( repository );
const useCaseUpdate = new UpdateSesionAsistenteUseCaseImpl( repository );
const useCaseDelete = new DeleteSesionAsistenteUseCaseImpl( repository );
const controller = new SesionAsistenteController( useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete );

export const sesionAsistenteResolvers = {
    Query: {
        sesionAsistente: (_: any, args: { id:string }) => controller.getSesionAsistente(args.id),
        sesionAsistentes: () => controller.getSesionesAsistentes()
    },
    Mutation: {
        createSesionAsistente: (_: any, args: { data:SesionAsistente }) => controller.createSesionAsistente(args.data),
        updateSesionAsistente: (_: any, args: { id:string, data:SesionAsistente }) => controller.updateSesionAsistente(args.id, args.data),
        deleteSesionAsistente: (_: any, args: { id:string }) => controller.deleteSesionAsistente(args.id)
    }
};
