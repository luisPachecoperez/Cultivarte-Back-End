import { PersonaGrupoInteres, 
         RespuestaGrap,
         PersonasGruposInteresRepository} from "../../";

export interface GetPersonasGrupoInteres {
    execute(): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
}

export class GetPersonasGrupoInteresImpl implements GetPersonasGrupoInteres {
    constructor(
        private personasGruposInteresRepository: PersonasGruposInteresRepository
    ) {}
    
    execute(): Promise<PersonaGrupoInteres[] | RespuestaGrap> {
        return this.personasGruposInteresRepository.getAll();
    }
}
    