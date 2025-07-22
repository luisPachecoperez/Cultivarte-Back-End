import { Beneficiario,
         CreateBeneficiarioUseCaseImpl,
         DeleteBeneficiarioUseCaseImpl,
         GetBeneficiariosUseCaseImpl,
         GetBeneficiarioUseCaseImpl,
         UpdateBeneficiarioUseCaseImpl } from "../../domain";
import { BeneficiarioDataSourceImpl } from "../../infrastructure/datasource/beneficiario-datasource-impl";
import { BeneficiarioController } from "../../aplication/controller/beneficiario-controller";
import { BeneficiarioRepositoryImpl } from "../../infrastructure/repositories/beneficiario-repository-impl";

const dataSource = new BeneficiarioDataSourceImpl();
const repository = new BeneficiarioRepositoryImpl( dataSource );
const useCaseGetById = new GetBeneficiarioUseCaseImpl( repository );
const useCaseGetAll = new GetBeneficiariosUseCaseImpl( repository );
const useCaseCreate = new CreateBeneficiarioUseCaseImpl( repository );
const useCaseUpdate = new UpdateBeneficiarioUseCaseImpl( repository );
const useCaseDelete = new DeleteBeneficiarioUseCaseImpl( repository );
const controller = new BeneficiarioController( useCaseCreate, useCaseGetAll, useCaseGetById, useCaseUpdate, useCaseDelete );

export const beneficiarioResolvers = {
    Query: {
      beneficiarios: () => controller.getBeneficiarios(),
      beneficiario: (_: any, args: { id: string }) => controller.getBeneficiario( args.id )
    },
    Mutation: {
      createBeneficiario: (_: any, args: { data: Beneficiario }) => controller.createBeneficiario( args.data ),
      updateBeneficiario: (_: any, args: { id: string, data: Beneficiario }) => controller.updateBeneficiario( args.id, args.data ),
      deleteBeneficiario: (_: any, args: { id: string }) => controller.deleteBeneficiario( args.id )
    }
};