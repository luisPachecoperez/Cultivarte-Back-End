export interface Actividad {
    id_actividad?: string;
    id_programa: string;
    id_tipo_actividad: string;
    id_responsable: string;
    id_aliado: string;
    id_sede: string;
    id_frecuencia: string;
    frecuencia?: string;
    institucional: 'S' | 'N';
    nombre_actividad: string;
    descripcion: string;
    fecha_actividad?: Date | string;
    hora_inicio?: string;
    hora_fin?: string;
    plazo_asistencia?: Date;
    estado?: 'A' | 'I';
    id_creado_por?: string;
    fecha_creacion?: Date | string;
    id_modificado_por?: string;
    fecha_modificacion?: Date | string;
}
