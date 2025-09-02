export interface Poblacion {
    id_poblacion    : string;   // UUID
    id_padre?       : string | null; // Puede ser null por la FK
    nombre          : string;
}