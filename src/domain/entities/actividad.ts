export interface Actividad {
    id_actividad: string;
    id_programa: string;
    id_tipo_actividad: string;
    id_responsable: string;
    id_aliado: string;
    id_sede: string;
    id_frecuencia?: string;
    institucional: "S" | "N";
    nombre_actividad: string;
    descripcion: string;
    fecha_actividad_desde?: Date;
    fecha_actividad_hasta?: Date;
    plazo_asistencia?: Date;
    estado?: "A" | "I";
    id_creado_por?: string;
    fecha_creacion?: Date;
    id_modificado_por?: string;
    fecha_modificacion?: Date;
}
  