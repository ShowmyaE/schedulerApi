const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('path')
const cors = require("cors");



app.use(cors());
app.use(express.json())

const dbPath = path.join(__dirname, 'demodb.db')
let db = null

const initializeDbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(5003, () => {
            console.log('Server Running at http://localhost:5003')
        })
    } catch (error) {
        console.log(`DB Error : ${error.message}`)
        process.exit(1)
    }
}
initializeDbAndServer()

app.get('/students', async (req, res) => {
    const createTable=`CREATE TABLE studentslist(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      area_of_interest TEXT NOT NULL,
      available_from TEXT NOT NULL,
      available_to TEXT NOT NULL,
      mentors TEXT
    
            
      );`
     const createData=await db.run(createTable);
    const insertquery=`INSERT INTO studentslist(name,area_of_interest,available_from,available_to,mentors)
    VALUES ('Benjamin Garcia','FMCG Sales','17:00','20:00',json('[]'))`;
    const insertData=await db.run(insertquery)
        
        const query = `SELECT * FROM studentslist `
        const userDbDetails =  await db.all(query);
            console.log('DB value', userDbDetails);
            res.send(userDbDetails)

})

app.get('/mentors', async (req, res) => {
    const createTable=`CREATE TABLE mentorslist(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      area_of_interest TEXT NOT NULL,
      available_from TEXT NOT NULL,
      available_to TEXT NOT NULL
    
            
      );`
     const createData=await db.run(createTable);
    const insertquery=`INSERT INTO mentorslist(name,area_of_interest,available_from,available_to)
    VALUES ('Sophia Lewis','["FMCG Sales", "E-Commerce"]','15:00','19:00')`;
    const insertData=await db.run(insertquery)
          
        const query = `SELECT * FROM mentorslist `;
        const userDbDetails =  await db.all(query);
            console.log('DB value', userDbDetails);
            res.send(userDbDetails)

})