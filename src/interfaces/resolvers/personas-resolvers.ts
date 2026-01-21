import {
  Persona,
  GetPersonaUseCaseImpl,
  CreatePersonaUseCaseImpl,
  UpdatePersonaUseCaseImpl,
  DeletePersonaUseCaseImpl,
  GetPersonasUseCaseImpl,
  GetAliadosSedeUseCaseImpl,
  GetBeneficiariosSedeUseCaseImpl,
  GetPersonaByTipoIdenficacionNumeroIdentificacionUseCaseImpl,
  GetPersonasParamsUseCaseImpl,
  GetPreBeneficiariosUseCaseImpl,
  UpdateBeneficiariosUseCaseImpl,
} from '../../domain';

import { PersonasController } from '../../aplication/controller/personas-controller';
import { PersonaRepositoryImpl } from '../../infrastructure/repositories/persona-repository-impl';
import { PersonaDataSourceImpl } from '../../infrastructure/datasource/personas-datasource-impl';
import { EditarBeneficiarios } from '@/domain/entities/Editar-beneficiarios';

const personaDataSource = new PersonaDataSourceImpl();
const personaRepository = new PersonaRepositoryImpl(personaDataSource);
const getPersonasUseCase = new GetPersonasUseCaseImpl(personaRepository);
const getPersonaUseCase = new GetPersonaUseCaseImpl(personaRepository);
const getPersonaByTipoIdenficacionNumeroIdentificacionUseCase =
  new GetPersonaByTipoIdenficacionNumeroIdentificacionUseCaseImpl(
    personaRepository,
  );
const getPersonasParamsUseCase = new GetPersonasParamsUseCaseImpl(
  personaRepository,
);
const getPreBeneficiariosUseCase = new GetPreBeneficiariosUseCaseImpl(
  personaRepository,
);
const updateBeneficiariosUseCase = new UpdateBeneficiariosUseCaseImpl(
  personaRepository,
);
const createPersonaUseCase = new CreatePersonaUseCaseImpl(personaRepository);
const updatePersonaUseCase = new UpdatePersonaUseCaseImpl(personaRepository);
const deletePersonaUseCase = new DeletePersonaUseCaseImpl(personaRepository);
const getAliadosSedeUseCase = new GetAliadosSedeUseCaseImpl(personaRepository);
const getBeneficiariosSedeUseCase = new GetBeneficiariosSedeUseCaseImpl(
  personaRepository,
);

const personasController = new PersonasController(
  getPersonaUseCase,
  getPersonasUseCase,
  getAliadosSedeUseCase,
  getBeneficiariosSedeUseCase,
  getPersonaByTipoIdenficacionNumeroIdentificacionUseCase,
  getPersonasParamsUseCase,
  getPreBeneficiariosUseCase,
  updateBeneficiariosUseCase,
  createPersonaUseCase,
  updatePersonaUseCase,
  deletePersonaUseCase,
);

export const createPersonasResolvers = (
  controller: PersonasController = personasController,
) => ({
  Query: {
    getPersonas: (_: any, args: { limit: number; offset: number }) =>
      controller.getPersonas(args.limit, args.offset),
    getPersona: (_: any, args: { id: string }) =>
      controller.getPersona(args.id),
    getAliadosSede: (_: any, args: { id_persona: string }) =>
      controller.getAliadosSede(args.id_persona),
    getBeneficiariosSede: () => controller.getBenSedes(),
    getPreBeneficiarios: (_: any, args: { id_usuario: string }) =>
      controller.getPreBeneficiarios(args.id_usuario),
    getPersonasParams: (
      _: any,
      args: {
        id_sede: string;
        id_programa: string;
        id_grupo_interes: string;
        limit: number;
        offset: number;
      },
    ) =>
      controller.getPersonasParams(
        args.id_sede,
        args.id_programa,
        args.id_grupo_interes,
        args.limit,
        args.offset,
      ),
    getPersonaByTipoIdenficacionNumeroIdentificacion: (
      _: any,
      args: { id_tipo_identificacion: string; identificacion: string },
    ) =>
      controller.getPersonaByTipoIdenficacionNumeroIdentificacion(
        args.id_tipo_identificacion,
        args.identificacion,
      ),
  },

  Mutation: {
    createPersona: (_: any, args: { data: Persona }) =>
      controller.createPersona(args.data),
    updatePersona: (_: any, args: { id: string; data: Persona }) =>
      controller.updatePersona(args.id, args.data),
    deletePersona: (_: any, args: { id: string }) =>
      controller.deletePersona(args.id),
    updateBeneficiarios: (_: any, args: { input: EditarBeneficiarios }) =>
      controller.updateBeneficiarios(args.input),
  },
});

export const personasResolvers = createPersonasResolvers();
