
import { Persona,GetPersonaUseCaseImpl,
         CreatePersonaUseCaseImpl,
         UpdatePersonaUseCaseImpl,
         DeletePersonaUseCaseImpl,
         GetPersonasUseCaseImpl,
         GetAliadosSedeUseCaseImpl,
         GetBeneficiariosSedeUseCaseImpl } from "../../domain";

import { PersonasController } from "../../aplication/controller/personas-controller";
import { PersonaRepositoryImpl } from "../../infrastructure/repositories/persona-repository-impl";
import { PersonaDataSourceImpl } from "../../infrastructure/datasource/personas-datasource-impl";

const personaDataSource = new PersonaDataSourceImpl();
const personaRepository = new PersonaRepositoryImpl( personaDataSource );
const getPersonasUseCase = new GetPersonasUseCaseImpl( personaRepository );
const getPersonaUseCase = new GetPersonaUseCaseImpl( personaRepository );
const createPersonaUseCase = new CreatePersonaUseCaseImpl( personaRepository );
const updatePersonaUseCase = new UpdatePersonaUseCaseImpl( personaRepository );
const deletePersonaUseCase = new DeletePersonaUseCaseImpl ( personaRepository );
const getAliadosSedeUseCase = new GetAliadosSedeUseCaseImpl( personaRepository );
const getBeneficiariosSedeUseCase = new GetBeneficiariosSedeUseCaseImpl( personaRepository );

const controller = new PersonasController(
    getPersonaUseCase,
    getPersonasUseCase,
    getAliadosSedeUseCase,
    getBeneficiariosSedeUseCase,
    createPersonaUseCase,
    updatePersonaUseCase,
    deletePersonaUseCase,
);


export const personasResolvers = {
    Query: {
        getPersonas: (_: any, args: { limit:number, offset:number }) => controller.getPersonas(args.limit, args.offset),
        getPersona: (_: any, args: { id:string }) => controller.getPersona( args.id ), 
        getAliadosSede: (_: any, args: { id_persona: string }) => controller.getAliadosSede(args.id_persona),
        getBeneficiariosSede: () => controller.getBeneficiariosSede()
    },

    Mutation: {
        createPersona: (_: any, args: { data:Persona }) => controller.createPersona( args.data ),
        updatePersona: (_: any, args: { id:string, data:Persona }) => controller.updatePersona( args.id, args.data ),
        deletePersona: (_: any, args: { id:string }) => controller.deletePersona( args.id )
    }
}