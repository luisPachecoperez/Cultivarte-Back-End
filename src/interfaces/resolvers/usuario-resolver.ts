
import { GetUsuarioUseCaseImpl,
         GetUsuariosUseCaseImpl,
         CreateUsuarioUseCaseImpl,
         UpdateUsuarioUseCaseImpl,
         DeleteUsuarioUseCaseImpl,
         Usuario } from '../../domain';
import { UsuarioDataSourceImpl } from "../../infrastructure/datasource/usuario-datasource-impl";
import { UsuarioRepositoryImpl } from "../../infrastructure/repositories/usuario-repository-impl";
import { UsuarioController } from "../../aplication/controller/usuario-controller";


const dataSource = new UsuarioDataSourceImpl();
const repository = new UsuarioRepositoryImpl( dataSource );
const useCaseGetById = new GetUsuarioUseCaseImpl(  repository );
const useCaseGetAll = new GetUsuariosUseCaseImpl( repository );
const useCaseCreate = new CreateUsuarioUseCaseImpl( repository );
const useCaseUpdate = new UpdateUsuarioUseCaseImpl( repository );
const useCaseDelete = new DeleteUsuarioUseCaseImpl( repository );
const controller = new UsuarioController( useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete );

export const usuarioResolvers = {
    Query: {
        usuario: (_: any, args: { id:string }) => controller.getUsuario( args.id ),
        usuarios: () => controller.getUsuarios()
    },
    Mutation: {
        createUsuario: (_: any, args: { data:Usuario }) => controller.createUsuario( args.data ),
        updateUsuario: (_: any, args: { id:string, data:Usuario }) => controller.updateUsuario( args.id, args.data ),
        deleteUsuario: (_: any, args: { id:string }) => controller.deleteUsuario( args.id )
    }
}
