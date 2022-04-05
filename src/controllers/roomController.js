const { open } = require('sqlite')
const Database = require('../database/config')

module.exports = {
    async create(req, res) {
        const db = await Database()

        const pass = req.body.password
        let generatedId
        
        let idExists = true

        while(idExists) {
            generatedId = generateId(6)

            const ids = await db.all(`SELECT id FROM rooms`)
            idExists = ids.some(existingId => existingId === generatedId)
        }

        await db.run(`
            INSERT INTO rooms (
                id,
                pass
            ) VALUES (
                ${generatedId},
                "${pass}"
            )
        `)

        await db.close()

        res.redirect(`/room/${generatedId}`)
    },
    
    async enter(req, res){
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()

        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

        let isQuestions = true
        if(questions.length == 0 && questionsRead.length == 0)
            isQuestions = false
        
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isQuestions: isQuestions})
    }
}

function generateId(numCharacters){
    let id = ""

    for(let i = 0; i < numCharacters; i++)
        id += Math.floor(Math.random() * 10).toString()

    return parseInt(id)
}

// function generateId(numCharacters){
//     let id = ""

//     do {
//         for(let i = 0; i < numCharacters; i++)
//             id += Math.floor(Math.random() * 10).toString()
//     } while(!checkId(id))

//     return parseInt(id)
// }

// function checkId(id) {
//     const ids = await db.all(`SELECT id FROM rooms`)

//     let idExists = ids.some(existingId => existingId === id)

//     return idExists
// }