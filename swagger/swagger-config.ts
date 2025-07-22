import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation - AMIS GraphQL',
      version: '1.0.0',
      description: 'Documentación de la API GraphQL para AMIS',
    },
    servers: [
      {
        url: 'http://localhost:4000/graphql',
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      { name: 'Eventos', description: 'Operaciones con eventos' },
      { name: 'Beneficiarios', description: 'Operaciones con beneficiarios' },
      { name: 'Sesiones', description: 'Operaciones con sesiones' },
      { name: 'Sesiones Asistentes', description: 'Operaciones con sesiones asistentes' },
      { name: 'Usuarios', description: 'Operaciones con usuarios' },
      { name: 'Parámetros Generales', description: 'Operaciones con parámetros generales' },
      { name: 'Parámetros Detalle', description: 'Operaciones con parámetros de detalle' },
    ],
    paths: {
      '/graphql': {
        post: {
          tags: ['GraphQL'],
          summary: 'Ejecutar consultas GraphQL',
          description: 'Endpoint principal para ejecutar cualquier consulta o mutación GraphQL',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    query: {
                      type: 'string',
                      description: 'La consulta GraphQL a ejecutar'
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables para la consulta (si aplica)'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Respuesta exitosa de la consulta GraphQL',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        description: 'Resultado de la consulta'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/graphql/eventos': {
        post: {
          tags: ['Eventos'],
          summary: 'Operaciones con eventos',
          description: 'Endpoint para operaciones relacionadas con eventos',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    operation: {
                      type: 'string',
                      enum: ['getEventos', 'createEvento', 'updateEvento', 'deleteEvento'],
                      description: 'Tipo de operación a realizar'
                    },
                    query: {
                      type: 'string',
                      description: 'La consulta GraphQL'
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables para la consulta'
                    }
                  }
                }
              }
            }
          },
          examples: {
            getEventos: {
              summary: 'Obtener lista de eventos',
              description: 'Ejemplo de cómo obtener todos los eventos con sus datos completos',
              value: {
                operation: 'getEventos',
                query: `query GetEventos {
  eventos {
    id
    institucional
    nombre_evento
    descripcion
    fecha_evento_desde
    fecha_evento_hasta
    estado
    creado_por
    fecha_creacion
  }
}`
              }
            },
            createEvento: {
              summary: 'Crear nuevo evento',
              description: 'Ejemplo de cómo crear un nuevo evento',
              value: {
                operation: 'createEvento',
                query: `mutation CreateEvento($data: EventoInput!) {
  createEvento(data: $data) {
    id
    institucional
    nombre_evento
    descripcion
    fecha_evento_desde
    fecha_evento_hasta
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  data: {
                    institucional: true,
                    nombre_evento: "Evento Anual de Bienestar",
                    descripcion: "Evento anual de bienestar social para beneficiarios",
                    fecha_evento_desde: "2025-06-01",
                    fecha_evento_hasta: "2025-06-03",
                    estado: "activo",
                    creado_por: "admin"
                  }
                }
              }
            },
            updateEvento: {
              summary: 'Actualizar evento existente',
              description: 'Ejemplo de cómo actualizar un evento existente',
              value: {
                operation: 'updateEvento',
                query: `mutation UpdateEvento($id: ID!, $data: EventoInput!) {
  updateEvento(id: $id, data: $data) {
    id
    institucional
    nombre_evento
    descripcion
    fecha_evento_desde
    fecha_evento_hasta
    estado
    modificado_por
    fecha_modificacion
  }
}`,
                variables: {
                  id: 1,
                  data: {
                    institucional: true,
                    nombre_evento: "Evento de Bienestar Actualizado",
                    descripcion: "Evento anual de bienestar social para beneficiarios",
                    fecha_evento_desde: "2025-06-01",
                    fecha_evento_hasta: "2025-06-03",
                    estado: "activo",
                    modificado_por: "admin"
                  }
                }
              }
            },
            deleteEvento: {
              summary: 'Eliminar evento',
              description: 'Ejemplo de cómo eliminar un evento',
              value: {
                operation: 'deleteEvento',
                query: `mutation DeleteEvento($id: ID!) {
  deleteEvento(id: $id)
}`,
                variables: {
                  id: 1
                }
              }
            }
          }
        }
      },
      '/graphql/beneficiarios': {
        post: {
          tags: ['Beneficiarios'],
          summary: 'Operaciones con beneficiarios',
          description: 'Endpoint para operaciones relacionadas con beneficiarios',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    operation: {
                      type: 'string',
                      enum: ['getBeneficiarios', 'getBeneficiarioById', 'createBeneficiario', 'updateBeneficiario', 'deleteBeneficiario'],
                      description: 'Tipo de operación a realizar'
                    },
                    query: {
                      type: 'string',
                      description: 'La consulta GraphQL'
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables para la consulta'
                    }
                  }
                }
              }
            }
          },
          examples: {
            getBeneficiarios: {
              summary: 'Obtener lista de beneficiarios',
              description: 'Ejemplo de cómo obtener todos los beneficiarios',
              value: {
                operation: 'getBeneficiarios',
                query: `query GetBeneficiarios {
  beneficiarios {
    id_beneficiario
    nombre
    primer_apellido
    segundo_apellido
    fecha_nacimiento
    identificacion
    genero
    ubicacion
    nombre_acudiente
    primer_apellido_acudiente
    correo_acudiente
    celular_acudiente
    fecha_creacion
  }
}`
              }
            },
            getBeneficiarioById: {
              summary: 'Obtener beneficiario por ID',
              description: 'Ejemplo de cómo obtener un beneficiario específico',
              value: {
                operation: 'getBeneficiarioById',
                query: `query GetBeneficiario($id: ID!) {
  beneficiario(id: $id) {
    id_beneficiario
    nombre
    primer_apellido
    segundo_apellido
    fecha_nacimiento
    identificacion
    genero
    ubicacion
    nombre_acudiente
    primer_apellido_acudiente
    correo_acudiente
    celular_acudiente
    fecha_creacion
  }
}`,
                variables: {
                  id: 1
                }
              }
            },
            createBeneficiario: {
              summary: 'Crear nuevo beneficiario',
              description: 'Ejemplo de cómo crear un nuevo beneficiario',
              value: {
                operation: 'createBeneficiario',
                query: `mutation CreateBeneficiario($data: BeneficiarioInput!) {
  createBeneficiario(data: $data) {
    id_beneficiario
    nombre
    primer_apellido
    segundo_apellido
    fecha_nacimiento
    identificacion
    genero
    ubicacion
    nombre_acudiente
    primer_apellido_acudiente
    correo_acudiente
    celular_acudiente
    fecha_creacion
  }
}`,
                variables: {
                  data: {
                    nombre: "Juan",
                    primer_apellido: "Pérez",
                    segundo_apellido: "Gómez",
                    fecha_nacimiento: "2010-01-01",
                    identificacion: "123456789",
                    genero: "masculino",
                    ubicacion: "Ciudad",
                    nombre_acudiente: "María",
                    primer_apellido_acudiente: "Gómez",
                    correo_acudiente: "maria.gomez@example.com",
                    celular_acudiente: "1234567890"
                  }
                }
              }
            },
            updateBeneficiario: {
              summary: 'Actualizar beneficiario',
              description: 'Ejemplo de cómo actualizar un beneficiario',
              value: {
                operation: 'updateBeneficiario',
                query: `mutation UpdateBeneficiario($id: ID!, $data: BeneficiarioInput!) {
  updateBeneficiario(id: $id, data: $data) {
    id_beneficiario
    nombre
    primer_apellido
    segundo_apellido
    fecha_nacimiento
    identificacion
    genero
    ubicacion
    nombre_acudiente
    primer_apellido_acudiente
    correo_acudiente
    celular_acudiente
    fecha_modificacion
  }
}`,
                variables: {
                  id: 1,
                  data: {
                    nombre: "Juan",
                    primer_apellido: "Pérez",
                    segundo_apellido: "Gómez",
                    fecha_nacimiento: "2010-01-01",
                    identificacion: "123456789",
                    genero: "masculino",
                    ubicacion: "Ciudad",
                    nombre_acudiente: "María",
                    primer_apellido_acudiente: "Gómez",
                    correo_acudiente: "maria.gomez@example.com",
                    celular_acudiente: "1234567890"
                  }
                }
              }
            },
            deleteBeneficiario: {
              summary: 'Eliminar beneficiario',
              description: 'Ejemplo de cómo eliminar un beneficiario',
              value: {
                operation: 'deleteBeneficiario',
                query: `mutation DeleteBeneficiario($id: ID!) {
  deleteBeneficiario(id: $id)
}`,
                variables: {
                  id: 1
                }
              }
            }
          }
        }
      },
      '/graphql/sesiones': {
        post: {
          tags: ['Sesiones'],
          summary: 'Operaciones con sesiones',
          description: 'Endpoint para operaciones relacionadas con sesiones',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    operation: {
                      type: 'string',
                      enum: ['getSesiones', 'getSesionById', 'createSesion', 'updateSesion', 'deleteSesion'],
                      description: 'Tipo de operación a realizar'
                    },
                    query: {
                      type: 'string',
                      description: 'La consulta GraphQL'
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables para la consulta'
                    }
                  }
                }
              }
            }
          },
          examples: {
            getSesiones: {
              summary: 'Obtener lista de sesiones',
              description: 'Ejemplo de cómo obtener todas las sesiones',
              value: {
                operation: 'getSesiones',
                query: `query GetSesiones {
  sesiones {
    id_sesion
    id_evento
    nombre_sesion
    fecha_sesion
    hora_inicio
    hora_fin
    estado
    creado_por
    fecha_creacion
  }
}`
              }
            },
            getSesionById: {
              summary: 'Obtener sesión por ID',
              description: 'Ejemplo de cómo obtener una sesión específica',
              value: {
                operation: 'getSesionById',
                query: `query GetSesion($id: ID!) {
  sesion(id: $id) {
    id_sesion
    id_evento
    nombre_sesion
    fecha_sesion
    hora_inicio
    hora_fin
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  id: 1
                }
              }
            },
            createSesion: {
              summary: 'Crear nueva sesión',
              description: 'Ejemplo de cómo crear una nueva sesión',
              value: {
                operation: 'createSesion',
                query: `mutation CreateSesion($data: SesionInput!) {
  createSesion(data: $data) {
    id_sesion
    id_evento
    nombre_sesion
    fecha_sesion
    hora_inicio
    hora_fin
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  data: {
                    id_evento: 1,
                    nombre_sesion: "Sesión de Bienestar",
                    fecha_sesion: "2025-06-01",
                    hora_inicio: "09:00",
                    hora_fin: "12:00",
                    estado: "activo",
                    creado_por: "admin"
                  }
                }
              }
            },
            updateSesion: {
              summary: 'Actualizar sesión',
              description: 'Ejemplo de cómo actualizar una sesión',
              value: {
                operation: 'updateSesion',
                query: `mutation UpdateSesion($id: ID!, $data: SesionInput!) {
  updateSesion(id: $id, data: $data) {
    id_sesion
    id_evento
    nombre_sesion
    fecha_sesion
    hora_inicio
    hora_fin
    estado
    modificado_por
    fecha_modificacion
  }
}`,
                variables: {
                  id: 1,
                  data: {
                    id_evento: 1,
                    nombre_sesion: "Sesión de Bienestar Actualizada",
                    fecha_sesion: "2025-06-01",
                    hora_inicio: "09:00",
                    hora_fin: "12:00",
                    estado: "activo",
                    modificado_por: "admin"
                  }
                }
              }
            },
            deleteSesion: {
              summary: 'Eliminar sesión',
              description: 'Ejemplo de cómo eliminar una sesión',
              value: {
                operation: 'deleteSesion',
                query: `mutation DeleteSesion($id: ID!) {
  deleteSesion(id: $id)
}`,
                variables: {
                  id: 1
                }
              }
            }
          }
        }
      },
      '/graphql/sesiones-asistentes': {
        post: {
          tags: ['Sesiones Asistentes'],
          summary: 'Operaciones con sesiones asistentes',
          description: 'Endpoint para operaciones relacionadas con sesiones asistentes',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    operation: {
                      type: 'string',
                      enum: ['getSesionesAsistentes', 'getSesionAsistenteById', 'createSesionAsistente', 'updateSesionAsistente', 'deleteSesionAsistente'],
                      description: 'Tipo de operación a realizar'
                    },
                    query: {
                      type: 'string',
                      description: 'La consulta GraphQL'
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables para la consulta'
                    }
                  }
                }
              }
            }
          },
          examples: {
            getSesionesAsistentes: {
              summary: 'Obtener lista de sesiones asistentes',
              description: 'Ejemplo de cómo obtener todas las sesiones asistentes',
              value: {
                operation: 'getSesionesAsistentes',
                query: `query GetSesionesAsistentes {
  sesionesAsistentes {
    id_sesion_asistente
    id_sesion
    id_beneficiario
    asistio
    fecha_creacion
  }
}`
              }
            },
            getSesionAsistenteById: {
              summary: 'Obtener sesión asistente por ID',
              description: 'Ejemplo de cómo obtener una sesión asistente específica',
              value: {
                operation: 'getSesionAsistenteById',
                query: `query GetSesionAsistente($id: ID!) {
  sesionAsistente(id: $id) {
    id_sesion_asistente
    id_sesion
    id_beneficiario
    asistio
    fecha_creacion
  }
}`,
                variables: {
                  id: 1
                }
              }
            },
            createSesionAsistente: {
              summary: 'Crear nueva sesión asistente',
              description: 'Ejemplo de cómo crear una nueva sesión asistente',
              value: {
                operation: 'createSesionAsistente',
                query: `mutation CreateSesionAsistente($data: SesionAsistenteInput!) {
  createSesionAsistente(data: $data) {
    id_sesion_asistente
    id_sesion
    id_beneficiario
    asistio
    fecha_creacion
  }
}`,
                variables: {
                  data: {
                    id_sesion: 1,
                    id_beneficiario: 1,
                    asistio: true
                  }
                }
              }
            },
            updateSesionAsistente: {
              summary: 'Actualizar sesión asistente',
              description: 'Ejemplo de cómo actualizar una sesión asistente',
              value: {
                operation: 'updateSesionAsistente',
                query: `mutation UpdateSesionAsistente($id: ID!, $data: SesionAsistenteInput!) {
  updateSesionAsistente(id: $id, data: $data) {
    id_sesion_asistente
    id_sesion
    id_beneficiario
    asistio
    fecha_modificacion
  }
}`,
                variables: {
                  id: 1,
                  data: {
                    id_sesion: 1,
                    id_beneficiario: 1,
                    asistio: true
                  }
                }
              }
            },
            deleteSesionAsistente: {
              summary: 'Eliminar sesión asistente',
              description: 'Ejemplo de cómo eliminar una sesión asistente',
              value: {
                operation: 'deleteSesionAsistente',
                query: `mutation DeleteSesionAsistente($id: ID!) {
  deleteSesionAsistente(id: $id)
}`,
                variables: {
                  id: 1
                }
              }
            }
          }
        }
      },
      '/graphql/usuarios': {
        post: {
          tags: ['Usuarios'],
          summary: 'Operaciones con usuarios',
          description: 'Endpoint para operaciones relacionadas con usuarios',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    operation: {
                      type: 'string',
                      enum: ['getUsuarios', 'getUsuarioById', 'createUsuario', 'updateUsuario', 'deleteUsuario'],
                      description: 'Tipo de operación a realizar'
                    },
                    query: {
                      type: 'string',
                      description: 'La consulta GraphQL'
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables para la consulta'
                    }
                  }
                }
              }
            }
          },
          examples: {
            getUsuarios: {
              summary: 'Obtener lista de usuarios',
              description: 'Ejemplo de cómo obtener todos los usuarios',
              value: {
                operation: 'getUsuarios',
                query: `query GetUsuarios {
  usuarios {
    id_usuario
    nombre_usuario
    correo
    rol
    estado
    creado_por
    fecha_creacion
  }
}`
              }
            },
            getUsuarioById: {
              summary: 'Obtener usuario por ID',
              description: 'Ejemplo de cómo obtener un usuario específico',
              value: {
                operation: 'getUsuarioById',
                query: `query GetUsuario($id: ID!) {
  usuario(id: $id) {
    id_usuario
    nombre_usuario
    correo
    rol
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  id: 1
                }
              }
            },
            createUsuario: {
              summary: 'Crear nuevo usuario',
              description: 'Ejemplo de cómo crear un nuevo usuario',
              value: {
                operation: 'createUsuario',
                query: `mutation CreateUsuario($data: UsuarioInput!) {
  createUsuario(data: $data) {
    id_usuario
    nombre_usuario
    correo
    rol
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  data: {
                    nombre_usuario: "admin",
                    correo: "admin@example.com",
                    rol: "administrador",
                    estado: "activo",
                    creado_por: "admin"
                  }
                }
              }
            },
            updateUsuario: {
              summary: 'Actualizar usuario',
              description: 'Ejemplo de cómo actualizar un usuario',
              value: {
                operation: 'updateUsuario',
                query: `mutation UpdateUsuario($id: ID!, $data: UsuarioInput!) {
  updateUsuario(id: $id, data: $data) {
    id_usuario
    nombre_usuario
    correo
    rol
    estado
    modificado_por
    fecha_modificacion
  }
}`,
                variables: {
                  id: 1,
                  data: {
                    nombre_usuario: "admin",
                    correo: "admin@example.com",
                    rol: "administrador",
                    estado: "activo",
                    modificado_por: "admin"
                  }
                }
              }
            },
            deleteUsuario: {
              summary: 'Eliminar usuario',
              description: 'Ejemplo de cómo eliminar un usuario',
              value: {
                operation: 'deleteUsuario',
                query: `mutation DeleteUsuario($id: ID!) {
  deleteUsuario(id: $id)
}`,
                variables: {
                  id: 1
                }
              }
            }
          }
        }
      },
      '/graphql/parametros-generales': {
        post: {
          tags: ['Parámetros Generales'],
          summary: 'Operaciones con parámetros generales',
          description: 'Endpoint para operaciones relacionadas con parámetros generales',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    operation: {
                      type: 'string',
                      enum: ['getParametrosGenerales', 'getParametroGeneralById', 'createParametroGeneral', 'updateParametroGeneral', 'deleteParametroGeneral'],
                      description: 'Tipo de operación a realizar'
                    },
                    query: {
                      type: 'string',
                      description: 'La consulta GraphQL'
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables para la consulta'
                    }
                  }
                }
              }
            }
          },
          examples: {
            getParametrosGenerales: {
              summary: 'Obtener lista de parámetros generales',
              description: 'Ejemplo de cómo obtener todos los parámetros generales',
              value: {
                operation: 'getParametrosGenerales',
                query: `query GetParametrosGenerales {
  parametrosGenerales {
    id_parametro
    nombre
    valor
    descripcion
    estado
    creado_por
    fecha_creacion
  }
}`
              }
            },
            getParametroGeneralById: {
              summary: 'Obtener parámetro general por ID',
              description: 'Ejemplo de cómo obtener un parámetro general específico',
              value: {
                operation: 'getParametroGeneralById',
                query: `query GetParametroGeneral($id: ID!) {
  parametroGeneral(id: $id) {
    id_parametro
    nombre
    valor
    descripcion
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  id: 1
                }
              }
            },
            createParametroGeneral: {
              summary: 'Crear nuevo parámetro general',
              description: 'Ejemplo de cómo crear un nuevo parámetro general',
              value: {
                operation: 'createParametroGeneral',
                query: `mutation CreateParametroGeneral($data: ParametroGeneralInput!) {
  createParametroGeneral(data: $data) {
    id_parametro
    nombre
    valor
    descripcion
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  data: {
                    nombre: "parámetro general",
                    valor: "valor del parámetro",
                    descripcion: "descripción del parámetro",
                    estado: "activo",
                    creado_por: "admin"
                  }
                }
              }
            },
            updateParametroGeneral: {
              summary: 'Actualizar parámetro general',
              description: 'Ejemplo de cómo actualizar un parámetro general',
              value: {
                operation: 'updateParametroGeneral',
                query: `mutation UpdateParametroGeneral($id: ID!, $data: ParametroGeneralInput!) {
  updateParametroGeneral(id: $id, data: $data) {
    id_parametro
    nombre
    valor
    descripcion
    estado
    modificado_por
    fecha_modificacion
  }
}`,
                variables: {
                  id: 1,
                  data: {
                    nombre: "parámetro general",
                    valor: "valor del parámetro",
                    descripcion: "descripción del parámetro",
                    estado: "activo",
                    modificado_por: "admin"
                  }
                }
              }
            },
            deleteParametroGeneral: {
              summary: 'Eliminar parámetro general',
              description: 'Ejemplo de cómo eliminar un parámetro general',
              value: {
                operation: 'deleteParametroGeneral',
                query: `mutation DeleteParametroGeneral($id: ID!) {
  deleteParametroGeneral(id: $id)
}`,
                variables: {
                  id: 1
                }
              }
            }
          }
        }
      },
      '/graphql/parametros-detalle': {
        post: {
          tags: ['Parámetros Detalle'],
          summary: 'Operaciones con parámetros de detalle',
          description: 'Endpoint para operaciones relacionadas con parámetros de detalle',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    operation: {
                      type: 'string',
                      enum: ['getParametrosDetalle', 'getParametroDetalleById', 'createParametroDetalle', 'updateParametroDetalle', 'deleteParametroDetalle'],
                      description: 'Tipo de operación a realizar'
                    },
                    query: {
                      type: 'string',
                      description: 'La consulta GraphQL'
                    },
                    variables: {
                      type: 'object',
                      description: 'Variables para la consulta'
                    }
                  }
                }
              }
            }
          },
          examples: {
            getParametrosDetalle: {
              summary: 'Obtener lista de parámetros de detalle',
              description: 'Ejemplo de cómo obtener todos los parámetros de detalle',
              value: {
                operation: 'getParametrosDetalle',
                query: `query GetParametrosDetalle {
  parametrosDetalle {
    id_parametro_detalle
    id_parametro
    nombre
    valor
    descripcion
    estado
    creado_por
    fecha_creacion
  }
}`
              }
            },
            getParametroDetalleById: {
              summary: 'Obtener parámetro de detalle por ID',
              description: 'Ejemplo de cómo obtener un parámetro de detalle específico',
              value: {
                operation: 'getParametroDetalleById',
                query: `query GetParametroDetalle($id: ID!) {
  parametroDetalle(id: $id) {
    id_parametro_detalle
    id_parametro
    nombre
    valor
    descripcion
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  id: 1
                }
              }
            },
            createParametroDetalle: {
              summary: 'Crear nuevo parámetro de detalle',
              description: 'Ejemplo de cómo crear un nuevo parámetro de detalle',
              value: {
                operation: 'createParametroDetalle',
                query: `mutation CreateParametroDetalle($data: ParametroDetalleInput!) {
  createParametroDetalle(data: $data) {
    id_parametro_detalle
    id_parametro
    nombre
    valor
    descripcion
    estado
    creado_por
    fecha_creacion
  }
}`,
                variables: {
                  data: {
                    id_parametro: 1,
                    nombre: "parámetro de detalle",
                    valor: "valor del parámetro",
                    descripcion: "descripción del parámetro",
                    estado: "activo",
                    creado_por: "admin"
                  }
                }
              }
            },
            updateParametroDetalle: {
              summary: 'Actualizar parámetro de detalle',
              description: 'Ejemplo de cómo actualizar un parámetro de detalle',
              value: {
                operation: 'updateParametroDetalle',
                query: `mutation UpdateParametroDetalle($id: ID!, $data: ParametroDetalleInput!) {
  updateParametroDetalle(id: $id, data: $data) {
    id_parametro_detalle
    id_parametro
    nombre
    valor
    descripcion
    estado
    modificado_por
    fecha_modificacion
  }
}`,
                variables: {
                  id: 1,
                  data: {
                    id_parametro: 1,
                    nombre: "parámetro de detalle",
                    valor: "valor del parámetro",
                    descripcion: "descripción del parámetro",
                    estado: "activo",
                    modificado_por: "admin"
                  }
                }
              }
            },
            deleteParametroDetalle: {
              summary: 'Eliminar parámetro de detalle',
              description: 'Ejemplo de cómo eliminar un parámetro de detalle',
              value: {
                operation: 'deleteParametroDetalle',
                query: `mutation DeleteParametroDetalle($id: ID!) {
  deleteParametroDetalle(id: $id)
}`,
                variables: {
                  id: 1
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/**/*.ts'],
};

export const specs = swaggerJsdoc(options);
