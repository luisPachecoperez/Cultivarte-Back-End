import { Actividad } from './actividad';
import { AliadoItem, FrecuenciaItem, NombresActividad, ResponsableItem, SedeItem, TipoActividadItem } from './pre-create-actividad';
import { Sesion } from './sesion';
export interface PreEditActividad {
    id_programa: string;
    sedes: SedeItem[];
    tiposDeActividad: TipoActividadItem[];
    aliados: AliadoItem[];
    responsables: ResponsableItem[];
    nombresDeActividad: NombresActividad[];
    frecuencias: FrecuenciaItem[];
    actividad: Actividad;
    sesiones: Sesion[];
}
