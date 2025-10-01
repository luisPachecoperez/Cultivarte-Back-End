import {
  Asistencia,
  GetAsistenciaUseCase,
  GetAsistenciasUseCase,
  GetAsistenciasSedeUseCase,
  CreateAsistenciaUseCase,
  UpdateAsistenciaUseCase,
  DeleteAsistenciaUseCase,
  UpdateAsistenciasUseCase,
  PreAsistencia,
  GetPreAsistenciaUseCase,
  AsistenciaSesiones,
  RespuestaGrap,
} from "../../domain";

export class AsistenciasController {
  constructor(
    private readonly getAsistenciasUseCase: GetAsistenciasUseCase,
    private readonly getAsistenciaUseCase: GetAsistenciaUseCase,
    private readonly getAsistenciasSedeUseCase: GetAsistenciasSedeUseCase,
    private readonly getPreAsistenciaUseCase: GetPreAsistenciaUseCase,
    private readonly createAsistenciaUseCase: CreateAsistenciaUseCase,
    private readonly updateAsistenciaUseCase: UpdateAsistenciaUseCase,
    private readonly updateAsistenciasUseCase: UpdateAsistenciasUseCase,
    private readonly deleteAsistenciaUseCase: DeleteAsistenciaUseCase,
  ) {}

  async getAsistencias(): Promise<Asistencia[] | RespuestaGrap> {
    return this.getAsistenciasUseCase.execute();
  }

  async getAsistencia(
    id_asistencia: string,
  ): Promise<Asistencia | RespuestaGrap> {
    return this.getAsistenciaUseCase.execute(id_asistencia);
  }

  async getAsistenciasSede(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Asistencia[] | RespuestaGrap> {
    return this.getAsistenciasSedeUseCase.execute(
      id_usuario,
      fecha_inicio,
      fecha_fin,
    );
  }

  async getPreAsistencia(
    id_sesion: string,
  ): Promise<PreAsistencia | RespuestaGrap> {
    return this.getPreAsistenciaUseCase.execute(id_sesion);
  }

  async createAsistencia(asistencia: Asistencia): Promise<RespuestaGrap> {
    return this.createAsistenciaUseCase.execute(asistencia);
  }

  async updateAsistencia(
    id_asistencia: string,
    asistencia: Asistencia,
  ): Promise<RespuestaGrap> {
    return this.updateAsistenciaUseCase.execute(id_asistencia, asistencia);
  }

  async updateAsistencias(
    asistenciaSesiones: AsistenciaSesiones,
  ): Promise<RespuestaGrap> {
    return this.updateAsistenciasUseCase.execute(asistenciaSesiones);
  }

  async deleteAsistencia(id_asistencia: string): Promise<RespuestaGrap> {
    return this.deleteAsistenciaUseCase.execute(id_asistencia);
  }
}
