/**
 * Clase DAO para manejar operaciones relacionadas con usuarios en la base de datos.
*/

class UsuarioDAO {

    #database = null

    constructor(database) {
        this.#database = database
    }

    buscarUsuarioPorEmail(email) {

        const sql = 'SELECT * FROM usuarios WHERE email = ?'

        return this.#database.prepare(sql).get(email)

    }
    


}

module.exports = UsuarioDAO;