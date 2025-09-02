export interface Sede {
    id_sede                     :string;
    id_pais                     :string;
    id_departamento             :string;
    id_ciudad                   :string;
    id_regional_davivienda      :string;
    id_regional_seguros_bolivar :string;
    id_tipo_inmueble            :string;
    id_espacio                  :string;
    id_uso_inmueble             :string;
    id_nivel_inmueble           :string;
    id_condicion_urbana         :string;
    id_clima                    :string;
    id_condicion_inmueble       :string;
    nombre                      :string;
    numero_convenio             :string;
    fecha_apertura_sede         :string; // ISO Date
    matricula_inmobiliaria      :string;
  
    // Auditoría
    id_creado_por               :string;
    fecha_creacion              :string; // ISO Date
    id_modificado_por           :string;
    fecha_modificacion          :string; // ISO Date
  }
  