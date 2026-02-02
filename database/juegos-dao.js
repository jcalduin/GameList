/**
 * Acceso a datos para la entidad "juegos". 
*/

class JuegosDAO {

    #database = null

    constructor(database) {
        this.#database = database
    }

    buscarJuegosPorUsuarioId(usuarioId) {

        const sql = 'SELECT * FROM videojuegos WHERE usuario_id = ?'

        const resultado = this.#database.prepare(sql).all(usuarioId)

        return resultado

    }

    eliminarJuegoPorId(juegoId) {

        const sql = 'DELETE FROM videojuegos WHERE id = ?'

        this.#database.prepare(sql).run(juegoId)

    }

    editarJuego(juegoId, titulo, plataforma, genero, estado, imagen) {

        const sql = 'UPDATE videojuegos SET titulo = ?, plataforma = ?, genero = ?, estado = ?, imagen = ? WHERE id = ?'

        this.#database.prepare(sql).run(titulo, plataforma, genero, estado, imagen, juegoId);

    }

    buscarJuegoPorId(juegoId) {

        const sql = 'SELECT * FROM videojuegos WHERE id = ?'

        const resultado = this.#database.prepare(sql).get(juegoId)

        return resultado    
    }

    agregarJuego(titulo, plataforma, genero, estado, imagen, usuarioId) {

        const sql = 'INSERT INTO videojuegos (titulo, plataforma, genero, estado, imagen, usuario_id) VALUES (?, ?, ?, ?, ?, ?)'

        this.#database.prepare(sql).run(titulo, plataforma, genero, estado, imagen, usuarioId)

    }


}

module.exports = JuegosDAO;