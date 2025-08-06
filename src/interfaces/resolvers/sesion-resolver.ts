
import { GetSesionUseCaseImpl,
         GetSesionesUseCaseImpl,
         CreateSesionUseCaseImpl,
         UpdateSesionUseCaseImpl,
         DeleteSesionUseCaseImpl } from '../../domain';
import { SesionController } from '../../aplication/controller/sesion-controller';
import { SesionDataSourceImpl } from '../../infrastructure/datasource/sesion-datasource-impl';
import { SesionRepositoryImpl } from '../../infrastructure/repositories/sesion-repository-impl';
import { Sesion } from '../../domain/index';

const dataSource = new SesionDataSourceImpl();
const repository = new SesionRepositoryImpl( dataSource );
const useCaseGetById = new GetSesionUseCaseImpl(  repository );
const useCaseGetAll = new GetSesionesUseCaseImpl( repository );
const useCaseCreate = new CreateSesionUseCaseImpl( repository );
const useCaseUpdate = new UpdateSesionUseCaseImpl( repository );
const useCaseDelete = new DeleteSesionUseCaseImpl( repository );
const controller = new SesionController( useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete );

export const sesionResolvers = {
    Query: {
        getSesion: (_: any, args: { id:string }) => controller.getSesion( args.id ),
        getSesiones: () => controller.getSesiones()
    },
    Mutation: {
        createSesion: (_: any, args: { data:Sesion }) => controller.createSesion( args.data ),
        updateSesion: (_: any, args: { id:string, data:Sesion }) => controller.updateSesion( args.id, args.data ),
        deleteSesion: (_: any, args: { id:string }) => controller.deleteSesion(args.id)
    }
};
