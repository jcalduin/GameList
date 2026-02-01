/**
 * Archivo para inicializar la tabla videojuegos
 */

module.exports = (db) => {

    const sql = `
        CREATE TABLE IF NOT EXISTS videojuegos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            titulo VARCHAR(255) NOT NULL,
            plataforma VARCHAR(255) CHECK(plataforma IN ('PC', 'PlayStation', 'Xbox', 'Switch')) NOT NULL,
            genero VARCHAR(255) CHECK(genero IN ('Acción', 'Aventura', 'RPG', 'Deportes', 'Estrategia', 'Puzzle', 'Shooter', 'Simulación', 'Terror')),
            estado VARCHAR(255) CHECK(estado IN ('Pendiente', 'Jugando', 'Completado', 'Abandonado')) DEFAULT 'Pendiente',
            imagen TEXT,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
        )
    `

    db.prepare(sql).run();
    
    const count = db.prepare('SELECT count(*) as total FROM videojuegos').get()
    if (count.total === 0) {
        
        const insert = db.prepare('INSERT INTO videojuegos (usuario_id, titulo, plataforma, genero, estado, imagen) VALUES (?, ?, ?, ?, ?, ?)');
        
        insert.run(1, 'Super Mario Odyssey','Switch','Aventura','Completado','https://i.3djuegos.com/juegos/14037/mario_switch/fotos/ficha/mario_switch-3759134.jpg');
        
        insert.run(1, 'The Legend of Zelda: Breath of the Wild','Switch','Aventura','Jugando','https://m.media-amazon.com/images/I/81KGsbq8ekL.jpg://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58');
        
        insert.run(1, 'Elden Ring','PC','RPG','Pendiente','https://image.https://cdn11.bigcommerce.com/s-k0hjo2yyrq/images/stencil/1280x1280/products/17644/18449/ER_Packshot_Game_SOTE_Expansion__02638.1721650489.jpg?c=1.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png');
        
        insert.run(1, 'God of War','PlayStation','Acción','Completado','https://image.https://media.game.es/COVERV2/3D_L/173/173386.png.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png');
        
        insert.run(1, 'Hollow Knight','PC','Aventura','Jugando','https://cdn.cloudflare.https://cdn.cdkeys.com/media/catalog/product/a/f/affeaf_10_16_15_.jpg.com/steam/apps/367520/header.jpg');
    }

}