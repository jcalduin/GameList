/**
 * Acceso a datos para la entidad "juegos".
 * Creamos una clase que se instanciará pasándole la base de datos (conexión) para poder realizar las operaciones
 * necesarias sobre la tabla "videojuegos".
 * Cada método de la clase implementa una operación sobre la tabla "videojuegos". 
 * @module database/juegos-dao
*/

class JuegosDAO {

    #database = null

    constructor(database) {
        this.#database = database
    }

    // Método para buscar todos los juegos de un usuario por su id, usado en el listado de juegos
    buscarJuegosPorUsuarioId(usuarioId) {

        const sql = 'SELECT * FROM videojuegos WHERE usuario_id = ?'

        const resultado = this.#database.prepare(sql).all(usuarioId)

        return resultado

    }

    // Método para eliminar un juego por su id, usado en la funcionalidad de eliminar juego
    eliminarJuegoPorId(juegoId) {

        const sql = 'DELETE FROM videojuegos WHERE id = ?'

        this.#database.prepare(sql).run(juegoId)

    }

    // Método para editar un juego, usado en la funcionalidad de editar juego
    editarJuego(juegoId, titulo, plataforma, genero, estado, imagen) {

        const sql = 'UPDATE videojuegos SET titulo = ?, plataforma = ?, genero = ?, estado = ?, imagen = ? WHERE id = ?'

        this.#database.prepare(sql).run(titulo, plataforma, genero, estado, imagen, juegoId);

    }

    // Método para buscar un juego por su id, usado en la funcionalidad de editar juego
    buscarJuegoPorId(juegoId) {

        const sql = 'SELECT * FROM videojuegos WHERE id = ?'

        const resultado = this.#database.prepare(sql).get(juegoId)

        return resultado    
    }

    agregarJuego(titulo, plataforma, genero, estado, imagen, usuarioId) {

        // Insertar un nuevo juego en la base de datos, asociado al usuario cuyo id se pasa como parámetro
        const sql = 'INSERT INTO videojuegos (titulo, plataforma, genero, estado, imagen, usuario_id) VALUES (?, ?, ?, ?, ?, ?)'

        this.#database.prepare(sql).run(titulo, plataforma, genero, estado, imagen, usuarioId)

    }

    // Método para filtrar juegos según los criterios proporcionados
    filtrarJuegos(usuarioId, filtros) {

        let sql = 'SELECT * FROM videojuegos WHERE usuario_id = ?'

        const parametrosBusqueda = [usuarioId]

        // Agregar condiciones a la consulta SQL según los filtros proporcionados
        if (filtros.plataforma && filtros.plataforma !== '') {

            sql += ' AND plataforma = ?'
            parametrosBusqueda.push(filtros.plataforma)
        }   

        if (filtros.genero && filtros.genero !== '') {

            sql += ' AND genero = ?'
            parametrosBusqueda.push(filtros.genero)
        }

        if (filtros.estado && filtros.estado !== '') {

            sql += ' AND estado = ?'
            parametrosBusqueda.push(filtros.estado)
        }

        const resultado = this.#database.prepare(sql).all(...parametrosBusqueda)

        return resultado

    }


}

module.exports = JuegosDAO;