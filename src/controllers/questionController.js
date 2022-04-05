const Database = require('../database/config')

module.exports = {
    async index(req, res) {
        const db = await Database()

        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const pass = req.body.password

        const room = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if (room.pass == pass) {
            
            if (action == "check") {
                
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

            } else if (action == "delete") {
                
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            }
        }

        res.redirect(`/room/${roomId}`)
    },

    async create(req, res) {
        const db = await Database()

        const roomId = req.params.room
        const question = req.body.question

        await db.run(`
            INSERT INTO questions (
                statement,
                read,
                room
            ) VALUES (
                "${question}",
                0,
                ${roomId}
            )
        `)

        res.redirect(`/room/${roomId}`)
    }
}