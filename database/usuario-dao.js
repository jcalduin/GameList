/**
 * Clase DAO para manejar operaciones relacionadas con usuarios en la base de datos.
 * Creamos una clase que se instancia con una conexión a la base de datos y proporciona métodos
 * para buscar y agregar usuarios.
 * @module database/usuario-dao
*/

class UsuarioDAO {

    #database = null

    constructor(database) {
        this.#database = database
    }

    // Método para buscar un usuario por su email, usado en la funcionalidad de login
    buscarUsuarioPorEmail(email) {

        const sql = 'SELECT * FROM usuarios WHERE email = ?'

        return this.#database.prepare(sql).get(email)

    }
    
    // Método para agregar un nuevo usuario, usado en la funcionalidad de registro
    agregarUsuario(nickname, email, password) {

        const sql = 'INSERT INTO usuarios (nickname, email, password) VALUES (?, ?, ?)'

        const resultado = this.#database.prepare(sql).run(nickname, email, password)

        return resultado
    }

}

module.exports = UsuarioDAO;