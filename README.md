![Logo](https://vectorseek.com/wp-content/uploads/2023/09/Davivienda-Logo-Vector.svg-.png)

# Guía para Desarrolladores: davi-fbol-cultivarte-back-mngr

## 1. Introducción

Este documento proporciona una guía completa para desarrolladores que trabajan en el proyecto `davi-fbol-cultivarte-back-mngr`. El proyecto es un backend de Node.js construido con TypeScript que expone una API GraphQL para gestionar la lógica de negocio de la aplicación Cultivarte.

El manual cubre desde la configuración inicial del entorno de desarrollo hasta las pautas de arquitectura, estándares de código y flujos de trabajo de CI/CD.

## 2. Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu sistema:

- **Node.js**: Se recomienda la versión LTS (v18.x o superior).
- **NPM**: Generalmente se instala junto con Node.js.
- **Docker**: Para construir y ejecutar la aplicación en un entorno containerizado.
- **Git**: Para el control de versiones.

## 3. Configuración del Entorno de Desarrollo

Sigue estos pasos para configurar el proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/davivienda-colombia/davi-fbol-cultivarte-back-mngr.git
    cd davi-fbol-cultivarte-back-mngr
    ```

2.  **Instalar dependencias:**
    El proyecto utiliza `npm` para la gestión de paquetes.
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    El proyecto requiere variables de entorno para la conexión a la base de datos y otros servicios. Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example` (si existe) o utilizando las siguientes variables como plantilla:
    ```env
    # Variables de Base de Datos
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=tu_contraseña
    DB_NAME=fbd_db

    # Entorno de la aplicación
    NODE_ENV=development
    PORT=4000
    ```
    **Nota:** En entornos de producción, estas variables se gestionan a través de un servicio de secretos (ver `src/interfaces/services/secrets.service.ts`).

## 4. Scripts Disponibles

El archivo `package.json` define varios scripts para automatizar tareas comunes:

-   **`npm start`**: Inicia la aplicación en modo de producción (requiere compilación previa).
-   **`npm run dev`**: Inicia la aplicación en modo de desarrollo con recarga automática (`nodemon`).
-   **`npm run build`**: Compila el código TypeScript a JavaScript en el directorio `dist/`.
-   **`npm test`**: Ejecuta la suite de pruebas unitarias e de integración con Jest.
-   **`npm run test:cov`**: Ejecuta las pruebas y genera un informe de cobertura de código en el directorio `coverage/`.
-   **`npm run lint`**: Analiza el código fuente en busca de errores de estilo y calidad utilizando ESLint.
-   **`npm run lint:fix`**: Intenta corregir automáticamente los problemas detectados por ESLint.

## 5. Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas, inspirada en los principios de **Domain-Driven Design (DDD)**, para separar las responsabilidades y mejorar la mantenibilidad.

-   **`src/domain`**: El corazón de la aplicación.
    -   **`entities`**: Representan los objetos de negocio fundamentales (ej: `Actividad`, `Asistencia`). No tienen dependencias externas.
    -   **`datasources`**: Definen los contratos (interfaces abstractas) para el acceso a datos. Desacoplan el dominio de la tecnología de persistencia.
    -   **`repositories`**: Definen interfaces para acceder y gestionar colecciones de entidades.
    -   **`use-cases`**: Orquestan la lógica de negocio utilizando entidades y repositorios.

-   **`src/infrastructure`**: Contiene las implementaciones concretas de las interfaces del dominio.
    -   **`datasource`**: Implementaciones de los datasources (ej: `ActividadDataSourceImpl`). Aquí reside la lógica de consultas a la base de datos (PostgreSQL).
    -   **`repositories`**: Implementaciones de los repositorios que utilizan los datasources.
    -   **`db`**: Configuración y gestión del pool de conexiones a la base de datos (`pool.ts`).

-   **`src/interfaces`**: La capa más externa, responsable de la interacción con el mundo exterior.
    -   **`graphql`, `schema`, `resolvers`**: Definen el esquema de la API GraphQL y la lógica que conecta las operaciones (queries, mutations) con los casos de uso.
    -   **`services`**: Servicios de infraestructura como `secrets.service.ts` para la gestión de secretos.

-   **`src/aplication/controller`**: Actúan como un intermediario entre la capa de `interfaces` y los `use-cases`, adaptando las entradas y salidas.

El flujo de una solicitud típica es: `GraphQL Resolver -> Controller -> Use Case -> Repository -> Datasource -> Base de Datos`.

## 6. Estándares de Código y Calidad

Para mantener la consistencia y la calidad del código, el proyecto impone los siguientes estándares:

-   **ESLint (`eslint.config.mjs`)**: Se utiliza para el análisis estático del código. Todos los desarrollos deben pasar las validaciones de ESLint sin errores. Ejecuta `npm run lint` antes de confirmar tus cambios.
-   **Commitlint (`commitlint.config.js`)**: Los mensajes de commit deben seguir la especificación de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Esto es crucial para la automatización de la generación de changelogs y el versionado.
    -   Ejemplo de un buen mensaje de commit: `feat(asistencias): agregar registro de asistencia por QR`
    -   Ejemplo de una corrección: `fix(sesiones): corregir cálculo de duración de la sesión`
-   **SonarQube (`sonar-project-custom.properties`)**: Se utiliza para un análisis de calidad de código más profundo, incluyendo la detección de vulnerabilidades, code smells y bugs. Es importante revisar los informes de SonarQube y abordar los problemas identificados.
-   **Cobertura de Pruebas**: Se exige un alto porcentaje de cobertura de código (generalmente > 90%). Utiliza `npm run test:cov` para verificar que tus cambios están cubiertos por pruebas.

## 7. Flujo de Trabajo de Desarrollo

1.  Crea una nueva rama desde `integration` o `main` siguiendo una convención de nomenclatura (ej: `feature/nombre-funcionalidad`, `fix/bug-a-corregir`).
2.  Implementa tus cambios, asegurándote de seguir la arquitectura del proyecto.
3.  Añade pruebas unitarias y/o de integración para tus cambios en el directorio `__Test__` correspondiente.
4.  Verifica que todas las pruebas pasen: `npm test`.
5.  Comprueba la cobertura de tus pruebas: `npm run test:cov`.
6.  Valida que el código cumple con los estándares de linting: `npm run lint`.
7.  Realiza commits con mensajes que sigan el estándar de Conventional Commits.
8.  Haz push de tu rama al repositorio y crea un Pull Request (PR) hacia la rama `integration`.
9.  El PR será revisado por el equipo y pasará por el pipeline de CI/CD antes de ser fusionado.

## 8. Despliegue (CI/CD)

El proyecto cuenta con un pipeline de integración y despliegue continuo configurado en los directorios `ci-cd/` y `pipeline/`.

-   **`ci-cd/install-dependencies.sh`**: Script para instalar las dependencias en el entorno de CI.
-   **`ci-cd/deploy.sh`**: Script que orquesta los pasos del despliegue.
-   **`docker/Dockerfile`**: Define la imagen de Docker para la aplicación, utilizada para los despliegues en los diferentes entornos (laboratorio, producción).
-   **`pipeline/*.json`**: Definen las tareas de despliegue para los diferentes entornos en AWS (Virginia).

El proceso de CI/CD generalmente incluye los siguientes pasos automatizados:
1.  Instalación de dependencias.
2.  Ejecución de linting y pruebas.
3.  Análisis de SonarQube.
4.  Construcción de la imagen de Docker.
5.  Despliegue en el entorno correspondiente.

## 9. Autores

- [Orlando Vasquez](https://github.com/ojvasquez_davicode)
- [Brayan Camilo Ibañez](https://github.com/brayan-ibanez_davicode)
- [Luis Pacheco Pérez](https://github.com/luism-pachecop_davicode)
