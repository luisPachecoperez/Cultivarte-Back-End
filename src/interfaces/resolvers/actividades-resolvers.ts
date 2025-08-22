
import { Actividad } from "../../domain/entities/actividad";
import { ActividadesController } from "../../aplication/controller/actividades-controller";
import { ActividadRepositoryImpl } from "../../infrastructure/repositories/actividad-repository-impl";
import { ActividadDataSourceImpl } from "../../infrastructure/datasource/actividad-datasource-impl";
import { GetActividadesUseCaseImpl,
  PreCreateActividadUseCaseImpl,
  DeleteActividadUseCaseImpl,
  UpdateActividadUseCaseImpl,
  CreateActividadUseCaseImpl,
  GetActividadUseCaseImpl } from "../../domain";

const dataSource = new ActividadDataSourceImpl();
const repository = new ActividadRepositoryImpl( dataSource );
const useCaseGetAll = new GetActividadesUseCaseImpl( repository );
const useCaseGetById = new GetActividadUseCaseImpl( repository );
const useCaseCreate = new CreateActividadUseCaseImpl( repository );
const useCaseUpdate = new UpdateActividadUseCaseImpl( repository );
const useCaseDelete = new DeleteActividadUseCaseImpl ( repository );
const useCasePreCreate = new PreCreateActividadUseCaseImpl( repository );
const controller = new ActividadesController( useCasePreCreate, useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete );


export const actividadesResolvers = {
  Query: {
    getActividades: () => controller.getActividades(),
    getActividad: (_: any, args: { id:string }) => controller.getActividad( args.id ), 
    getPreCreateActividad: (_: any, args: { id_usuario:string }) => controller.preCreateActividad( args.id_usuario )
  },
  Mutation: {
    createActividad: (_: any, args: { data:Actividad }) => controller.createActividad( args.data ),
    updateActividad: (_: any, args: { id:string, data:Actividad }) => controller.updateActividad( args.id, args.data ),
    deleteActividad: (_: any, args: { id:string }) => controller.deleteActividad( args.id )
  }
}