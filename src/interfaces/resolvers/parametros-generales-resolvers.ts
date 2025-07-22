import { GetParametroGeneralUseCaseImpl, 
         GetParametrosGeneralesUseCaseImpl, 
         CreateParametroGeneralUseCaseImpl, 
         UpdateParametroGeneralUseCaseImpl, 
         DeleteParametroGeneralUseCaseImpl, 
         ParametrosGenerales } from "../../domain";
import { ParametrosGeneralesDataSourceImpl } from "../../infrastructure/datasource/parametros-generales-datasource-impl";
import { ParametrosGeneralesController } from "../../aplication/controller/parametros-generales-controller";
import { ParametrosGeneralesRepositoryImpl } from "../../infrastructure/repositories/parametros-generales-impl";

const dataSource = new ParametrosGeneralesDataSourceImpl();
const repository = new ParametrosGeneralesRepositoryImpl( dataSource );
const useCaseGetById = new GetParametroGeneralUseCaseImpl(  repository );
const useCaseGetAll = new GetParametrosGeneralesUseCaseImpl( repository );
const useCaseCreate = new CreateParametroGeneralUseCaseImpl( repository );
const useCaseUpdate = new UpdateParametroGeneralUseCaseImpl( repository );
const useCaseDelete = new DeleteParametroGeneralUseCaseImpl( repository );
const controller = new ParametrosGeneralesController( useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete );

export const parametrosGeneralesResolvers ={
    Query: {
      parametrosGenerales: () => controller.getParametrosGenerales(),
      parametroGeneral: (_: any, args: { id:string }) => controller.getParametroGeneral( args.id )  
    },
    Mutation: {
      createParametroGeneral: (_: any, args: { data:ParametrosGenerales }) => controller.createParametroGeneral( args.data ),
      updateParametroGeneral: (_: any, args: { id:string, data:ParametrosGenerales }) => controller.updateParametroGeneral( args.id, args.data ),
      deleteParametroGeneral: (_: any, args: { id:string }) => controller.deleteParametroGeneral( args.id )
    }
}