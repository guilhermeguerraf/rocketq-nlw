const Database = require('./config')

const initDb = {
    async init(){
        const db = await Database();

        await db.exec(`
            CREATE TABLE rooms (
                id INTEGER PRIMARY KEY,
                pass TEXT
            )
        `);

        await db.exec(`
            CREATE TABLE questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                statement TEXT,
                read INTEGER,
                room INTEGER
            )
        `);

        db.close();
    }
}

initDb.init();