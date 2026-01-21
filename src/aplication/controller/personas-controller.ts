import { PreBeneficiario } from '@/domain/entities/beneficiario';
import {
  Persona,
  CreatePersonaUseCase,
  UpdatePersonaUseCase,
  DeletePersonaUseCase,
  GetPreBeneficiarioUseCase,
  UpdateBeneficiariosUseCase,
  GetPersonaByTipoIdenficacionNumeroIdentificacionUseCase,
  GetPersonasParamsUseCase,
  GetPersonaUseCase,
  GetPersonasUseCase,
  GetAliadosSedeUseCase,
  GetBeneficiariosSedeUseCase,
  RespuestaGrap,
} from '../../domain';
import { EditarBeneficiarios } from '@/domain/entities/Editar-beneficiarios';

export class PersonasController {
  n;
  constructor(
    private readonly getPersonaUseCase: GetPersonaUseCase,
    private readonly getPersonasUseCase: GetPersonasUseCase,
    private readonly getAliadosSedeUseCase: GetAliadosSedeUseCase,
    private readonly getBeneficiariosSedeUseCase: GetBeneficiariosSedeUseCase,
    private readonly getPersonaByTipoIdenficacionNumeroIdentificacionUseCase: GetPersonaByTipoIdenficacionNumeroIdentificacionUseCase,
    private readonly getPersonasParamsUseCase: GetPersonasParamsUseCase,
    private readonly getPreBeneficiariosUseCase: GetPreBeneficiarioUseCase,
    private readonly updateBeneficiariosUseCase: UpdateBeneficiariosUseCase,
    private readonly createPersonaUseCase: CreatePersonaUseCase,
    private readonly updatePersonaUseCase: UpdatePersonaUseCase,
    private readonly deletePersonaUseCase: DeletePersonaUseCase,
  ) {}

  async createPersona(persona: Persona): Promise<Persona | RespuestaGrap> {
    return this.createPersonaUseCase.execute(persona);
  }

  async updatePersona(
    id_persona: string,
    persona: Persona,
  ): Promise<Persona | RespuestaGrap> {
    return this.updatePersonaUseCase.execute(id_persona, persona);
  }

  async updateBeneficiarios(
    editarBeneficiarios: EditarBeneficiarios,
  ): Promise<RespuestaGrap> {
    return this.updateBeneficiariosUseCase.execute(editarBeneficiarios);
  }

  async deletePersona(id_persona: string): Promise<RespuestaGrap> {
    return this.deletePersonaUseCase.execute(id_persona);
  }

  async getPreBeneficiarios(
    id_usuario: string,
  ): Promise<PreBeneficiario[] | RespuestaGrap> {
    return this.getPreBeneficiariosUseCase.execute(id_usuario);
  }

  async getPersonasParams(
    id_sede: string,
    id_programa: string,
    id_grupo_interes: string,
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap> {
    return this.getPersonasParamsUseCase.execute(
      id_sede,
      id_programa,
      id_grupo_interes,
      limit,
      offset,
    );
  }

  async getPersona(id_persona: string): Promise<Persona | RespuestaGrap> {
    return this.getPersonaUseCase.execute(id_persona);
  }

  async getPersonas(
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap> {
    return this.getPersonasUseCase.execute(limit, offset);
  }

  async getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap> {
    return this.getAliadosSedeUseCase.execute(id_usuario);
  }

  async getBenSedes(): Promise<Persona[] | RespuestaGrap> {
    return this.getBeneficiariosSedeUseCase.execute();
  }

  async getPersonaByTipoIdenficacionNumeroIdentificacion(
    id_tipo_identificacion: string,
    identificacion: string,
  ): Promise<Persona | RespuestaGrap> {
    return this.getPersonaByTipoIdenficacionNumeroIdentificacionUseCase.execute(
      id_tipo_identificacion,
      identificacion,
    );
  }
}
