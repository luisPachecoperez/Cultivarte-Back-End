import { randomUUID } from 'node:crypto';
import { PoolClient } from 'pg';
import { Persona, PersonaDataSource, RespuestaGrap } from '../../domain';
import { pgPool } from '../db/pool';
import { personaQueries } from '../db/personas-queries';
import {
  PaisInfo,
  PreBeneficiario,
  SedeInfo,
  SexoInfo,
  TipoIdentificacionInfo,
  TipoPersonaInfo,
  UbicacionInfo,
} from '@/domain/entities/beneficiario';
import { EditarBeneficiarios } from '@/domain/entities/Editar-beneficiarios';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class PersonaDataSourceImpl
  extends BaseHomologatedDataSource
  implements PersonaDataSource
{
  constructor() {
    super(pgPool);
  }

  private buildPersonaUpsertValues(persona: Persona): unknown[] {
    const toDb = <T>(value: T | null | undefined): T | null => value ?? null;
    const now = new Date();

    return [
      persona.id_persona,
      toDb(persona.id_sede),
      persona.id_tipo_persona,
      toDb(persona.id_colegio),
      toDb(persona.id_sexo),
      toDb(persona.id_ubicacion),
      toDb(persona.id_pais),
      toDb(persona.id_departamento),
      toDb(persona.id_ciudad),
      toDb(persona.id_tipo_identificacion),
      toDb(persona.identificacion),
      toDb(persona.nombres),
      toDb(persona.apellidos),
      toDb(persona.razon_social),
      toDb(persona.fecha_nacimiento),
      toDb(persona.id_tipo_identificacion_acudiente),
      toDb(persona.identificacion_acudiente),
      toDb(persona.nombre_acudiente),
      toDb(persona.apellidos_acudiente),
      toDb(persona.correo_acudiente),
      toDb(persona.celular_acudiente),
      toDb(persona.archivo_habeas_data),
      toDb(persona.acepta_habeas_data),
      toDb(persona.fecha_habeas_data),
      toDb(persona.canal_habeas_data),
      toDb(persona.soporte_habeas_data),
      toDb(persona.dir_ip_habeas_data),
      toDb(persona.email),
      toDb(persona.email_contacto),
      toDb(persona.telefono_movil_contacto),
      toDb(persona.telefono_movil),
      persona.eliminado ?? 'N',
      persona.discapacitado ?? 'N',
      toDb(persona.id_creado_por),
      toDb(persona.fecha_creacion) ?? now,
      toDb(persona.id_modificado_por),
      toDb(persona.fecha_modificacion) ?? now,
      toDb(persona.id_eps),
      toDb(persona.direccion),
    ];
  }

  // Orquesta el upsert de la persona y sus relaciones obligatorias.
  private async persistBeneficiario(
    client: PoolClient,
    persona: Persona,
    id_programa: string,
    id_grupo_interes: string,
  ): Promise<void> {
    if (!persona?.id_persona) {
      throw new Error('El identificador de la persona es obligatorio');
    }

    await client.query(
      personaQueries.upsertPersona,
      this.buildPersonaUpsertValues(persona),
    );

    if (id_grupo_interes) {
      await client.query(personaQueries.ensurePersonaGrupoInteres, [
        randomUUID(),
        persona.id_persona,
        id_grupo_interes,
      ]);
    }

    if (id_programa) {
      await client.query(personaQueries.ensurePersonaPrograma, [
        randomUUID(),
        persona.id_persona,
        id_programa,
      ]);
    }

    if (persona.id_sede) {
      const sedeResult = await client.query<{
        id_persona_sede: string;
        id_sede: string;
      }>(personaQueries.selectPersonaSede, [persona.id_persona]);

      if (sedeResult.rowCount === 0) {
        await client.query(personaQueries.insertPersonaSede, [
          randomUUID(),
          persona.id_persona,
          persona.id_sede,
        ]);
      } else if (sedeResult.rows[0].id_sede !== persona.id_sede) {
        await client.query(personaQueries.updatePersonaSede, [
          persona.id_persona,
          persona.id_sede,
        ]);
      }
    }
  }

  private async removeBeneficiarioLinks(
    client: PoolClient,
    id_persona: string,
    id_programa: string,
    id_grupo_interes: string,
  ): Promise<void> {
    await client.query(personaQueries.softDeletePersona, [id_persona]);

    if (id_grupo_interes) {
      await client.query(personaQueries.deletePersonaGrupoInteres, [
        id_persona,
        id_grupo_interes,
      ]);
    }

    if (id_programa) {
      await client.query(personaQueries.deletePersonaPrograma, [
        id_persona,
        id_programa,
      ]);
    }

    await client.query(personaQueries.deletePersonaSede, [id_persona]);
  }

  async getAll(
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getAll, [limit, offset]);
      return res.rows as Persona[];
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener personas: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getById(id_persona: string): Promise<Persona | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getById, [id_persona]);
      return (res.rows[0] as Persona) || null;
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener persona: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async createPersona(persona: Persona): Promise<Persona | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.createPersona, [
        persona,
      ]);
      return (res.rows[0] as Persona) || null;
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al crear persona: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async updatePersona(
    id_persona: string,
    persona: Persona,
  ): Promise<Persona | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.updatePersona, [
        id_persona,
        persona,
      ]);
      return (res.rows[0] as Persona) || null;
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al actualizar persona: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async deletePersona(id_persona: string): Promise<RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.deletePersona, [
        id_persona,
      ]);
      return (
        (res.rows[0] as RespuestaGrap) || {
          exitoso: 'N',
          mensaje: 'No se pudo eliminar persona',
        }
      );
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al eliminar persona: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getAliadosSede, [
        id_usuario,
      ]);
      return (res.rows as Persona[]) || [];
    } catch (error: unknown) {
      console.error('Error en getAliadosSede:', error);
      const mensaje = await this.buildErrorMessage(
        'Error al obtener aliados: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getBenSedes(): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getBeneficiariosSede);
      return res.rows as Persona[];
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener beneficiarios: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getBeneficiarios(): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getBeneficiarios);
      return res.rows as Persona[];
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener beneficiarios: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getPreBeneficiarios(
    id_usuario: string,
  ): Promise<PreBeneficiario[] | RespuestaGrap> {
    const client = await this.pool.connect();
    try {
      const [
        programaRes,
        resPersonaGrupoInteRes,
        sedesRes,
        paisesRes,
        tipoIdentifiacionRes,
        tiposPersonaRes,
        sexoInfoRes,
        ubicaciones,
      ] = await Promise.all([
        client.query<{ id_programa: string }>(personaQueries.programaRes, [
          id_usuario,
        ]),
        client.query<{ id_grupo_interes: string }>(
          personaQueries.resPersonaGrupoInteres,
        ),
        client.query<SedeInfo>(personaQueries.sedesRes, [id_usuario]),
        client.query<PaisInfo>(personaQueries.paisesRes),
        client.query<TipoIdentificacionInfo>(
          personaQueries.tipoIdentificacionRes,
        ),
        client.query<TipoPersonaInfo>(personaQueries.tiposPersonaRes),
        client.query<SexoInfo>(personaQueries.sexoInfoRes),
        client.query<UbicacionInfo>(personaQueries.ubicacionesRes),
      ]);

      const id_programa = programaRes.rows[0]?.id_programa ?? null;
      const id_grupo_interes =
        resPersonaGrupoInteRes.rows[0]?.id_grupo_interes ?? null;

      const toStringId = (value: unknown): string => {
        if (value === null || value === undefined) {
          return '0';
        }
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          const str = String(value).trim();
          return str === '' ? '0' : str;
        }
        return '0';
      };

      let sedes: SedeInfo[] = sedesRes.rows ?? [];
      if (sedes.length === 0) {
        const allSedesRes = await client.query<SedeInfo>(
          personaQueries.allSedesRes,
        );
        sedes = allSedesRes.rows ?? [];
      }
      const preBeneficiarios: PreBeneficiario[] = [
        {
          id_programa: toStringId(id_programa),
          id_grupo_interes: toStringId(id_grupo_interes),
          sedes: sedes,
          paises: paisesRes.rows,
          tiposIdentificacion: tipoIdentifiacionRes.rows,
          tiposPersona: tiposPersonaRes.rows,
          sexo: sexoInfoRes.rows,
          ubicaciones: ubicaciones.rows,
        },
      ];

      return preBeneficiarios;
    } catch (error: unknown) {
      console.error('Error en getPreBeneficiarios:', error);
      const mensaje = await this.buildErrorMessage(
        'Error al obtener prebeneficiarios: ',
        error,
        client,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    } finally {
      client.release();
    }
  }

  async getPersonasParams(
    id_sede: string,
    id_programa: string,
    id_grupo_interes: string,
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getPersonasParams, [
        id_sede,
        id_programa,
        id_grupo_interes,
        limit,
        offset,
      ]);
      return res.rows as Persona[];
    } catch (error: unknown) {
      console.error('Error en getPersonasParams:', error);
      const mensaje = await this.buildErrorMessage(
        'Error al obtener personas con parámetros: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getPersonaByTipoIdenficacionNumeroIdentificacion(
    id_tipo_identificacion: string,
    identificacion: string,
  ): Promise<Persona | RespuestaGrap> {
    try {
      const res = await this.pool.query(
        personaQueries.getPersonaByTipoIdenficacionNumeroIdentificacion,
        [id_tipo_identificacion, identificacion],
      );
      return (res.rows[0] as Persona) || null;
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener persona por tipo y número de identificación: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async updateBeneficiarios(
    editarBeneficiarios: EditarBeneficiarios,
  ): Promise<RespuestaGrap> {
    if (!editarBeneficiarios) {
      console.error('updateBeneficiarios recibió un payload indefinido');
      return {
        exitoso: 'N',
        mensaje: 'Datos obligatorios faltantes para actualizar beneficiarios',
      };
    }

    console.log(
      'Iniciando updateBeneficiarios con payload:',
      editarBeneficiarios,
    );

    const idPrograma = editarBeneficiarios.id_programa;
    const idGrupoInteres = editarBeneficiarios.id_grupo_interes;

    if (!idPrograma || !idGrupoInteres) {
      console.error(
        'updateBeneficiarios recibió un payload inválido:',
        editarBeneficiarios,
      );
      return {
        exitoso: 'N',
        mensaje: 'Datos obligatorios faltantes para actualizar beneficiarios',
      };
    }

    const nuevos = editarBeneficiarios.nuevos ?? [];
    const modificados = editarBeneficiarios.modificados ?? [];
    const eliminados = editarBeneficiarios.eliminados ?? [];
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      for (const persona of [...nuevos, ...modificados]) {
        await this.persistBeneficiario(
          client,
          persona,
          idPrograma,
          idGrupoInteres,
        );
      }

      for (const personaEliminada of eliminados) {
        await this.removeBeneficiarioLinks(
          client,
          personaEliminada.id_persona,
          idPrograma,
          idGrupoInteres,
        );
      }

      await client.query('COMMIT');
      return {
        exitoso: 'S',
        mensaje: 'Beneficiarios actualizados correctamente',
      };
    } catch (error: unknown) {
      await client.query('ROLLBACK');
      console.error('Error en updateBeneficiarios:', error);
      const mensaje = await this.buildErrorMessage(
        'Error al actualizar beneficiarios: ',
        error,
        client,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    } finally {
      client.release();
    }
  }

}
