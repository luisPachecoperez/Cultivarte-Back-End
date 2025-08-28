import { Actividad } from "./actividad";
import { Item, NombresActividad, ResponsableItem } from "./pre-create-actividad";



export interface PreEditActividad {
    id_programa: string;
    sedes: Item[];
    tiposDeActividad: Item[];
    aliados: Item[];
    responsables: ResponsableItem[];
    nombresDeActividad: NombresActividad[];
    frecuencias: Item[];
    actividad: Actividad;
}
