export const sesionesQueries = {
    
    getAll: `SELECT * FROM sesiones`,

    getById: `SELECT * FROM sesiones WHERE id_sesion = $1`,

    create: `INSERT INTO sesiones (
                id_sesion, 
                id_actividad,
                fecha_actividad,
                hora_inicio,
                hora_fin,
                imagen,
                nro_asistentes,
                id_creado_por,
                fecha_creacion,
                id_modificado_por,
                fecha_modificacion) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
                
    updateById: `UPDATE sesiones SET 
                id_actividad = $2, 
                fecha_actividad = $3, 
                hora_inicio = $4, 
                hora_fin = $5, 
                imagen = $6, 
                nro_asistentes = $7, 
                id_creado_por = $8, 
                fecha_creacion = $9, 
                id_modificado_por = $10, 
                fecha_modificacion = $11 
                WHERE id_sesion = $1 RETURNING *`,

    deleteById: `DELETE FROM sesiones WHERE id_sesion = $1`,

    insertSesion: `INSERT INTO sesiones (
                id_sesion, 
                id_actividad,
                fecha_actividad,
                hora_inicio,
                hora_fin,
                imagen,
                nro_asistentes,
                id_creado_por,
                fecha_creacion,
                id_modificado_por,
                fecha_modificacion) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
                
    updateSesionesById: `UPDATE sesiones SET 
                id_sesion = $1,
                id_actividad = $2,
                fecha_actividad = $3,
                hora_inicio = $4,
                hora_fin = $5,
                imagen = $6,
                nro_asistentes = $7,
                id_creado_por = $8,
                fecha_creacion = $9,
                id_modificado_por = $10,
                fecha_modificacion = $11
                WHERE id_sesion = $1 RETURNING *`,

};