import { PoblacionDataSourceImpl } from './../../infrastructure/datasource/poblaciones-datasource-impl';
import { CreatePoblacionUseCaseImpl,
         UpdatePoblacionUseCaseImpl,
         DeletePoblacionUseCaseImpl,
         GetPoblacionesUseCaseImpl,
         GetPoblacionUseCaseImpl } from '../../domain';
import { PoblacionRepositoryImpl } from '../../infrastructure/repositories/poblacion-repository-impl';
import { PoblacionesController } from '../../aplication/controller/poblaciones-controller';
import { Poblacion } from '../../domain';

const dataSource = new PoblacionDataSourceImpl();  
const repository = new PoblacionRepositoryImpl( dataSource );
const createPoblacionUseCase = new CreatePoblacionUseCaseImpl( repository );
const updatePoblacionUseCase = new UpdatePoblacionUseCaseImpl( repository );
const deletePoblacionUseCase = new DeletePoblacionUseCaseImpl ( repository );
const getPoblacionesUseCase = new GetPoblacionesUseCaseImpl( repository );
const getPoblacionUseCase = new GetPoblacionUseCaseImpl( repository );

const controller = new PoblacionesController(
    getPoblacionesUseCase,
    getPoblacionUseCase,
    createPoblacionUseCase,
    updatePoblacionUseCase,
    deletePoblacionUseCase,
);


export const poblacionesResolvers = {
    Query: {
        getPoblaciones: () => controller.getPoblaciones(),
        getPoblacion: (_: any, args: { id:string }) => controller.getPoblacion( args.id ), 
    },
    Mutation: {
        createPoblacion: (_: any, args: { data:Poblacion }) => controller.createPoblacion( args.data ),
        updatePoblacion: (_: any, args: { id:string, data:Poblacion }) => controller.updatePoblacion( args.id, args.data ),
        deletePoblacion: (_: any, args: { id:string }) => controller.deletePoblacion( args.id )
    }
}
