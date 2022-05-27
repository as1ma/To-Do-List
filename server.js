const express = require('express')

const app = express()
const port = 3001 //common practice for local hosts - certain ports are reserved for other things

app.use(express.static('public')) //folder name

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

const sqlite3 = require("sqlite3")
const db = new sqlite3.Database(
    "./database.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            console.log("\nSuccess!\n");
        }
    }
);

// const path = require('path')
// const cors = require('cors')
// const multer = require('multer')
// const bodyParser = require('body-parser')

// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json())

// const upload = multer({ dest: path.join('.', 'images') })
// app.post('/USERS', upload.single('avatar'), (req, res) => {
//   console.log(req.body)
//   console.log(req.file)
// })

//postman
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

const { check, validationResult } = require('express-validator');

//inserts form inputs into database
app.post('/tasks', [
    check('name').not().isEmpty().trim().escape()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        console.log(req.body);
        const sql = `INSERT INTO task(NAME, DIFFICULTY_LEVEL, USER_ID) VALUES("${req.body.name}","${req.body.difficulty}","${req.body.user}")`;
  
        db.run(sql, (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            console.log("Rows Created!");
        }
        });
        res.sendStatus(201)
    }
})

//gets users from users table
app.get('/users', async (req, res) => {
 
        const selectSql = `SELECT * from users`;
        
       db.all(selectSql, (err, rows)=> {
        if(err){
            return console.error(err.message)
        }else{
            res.send(rows);
            // rows.forEach((row)=>{
            // console.log(row)})
        }
        })    
})


    
//gets tasks in database (which aren't set to archived (deleted))
app.get('/tasks', (req,res)=>{
    //where archived = 'false' - alter sql
    const selectSql = "SELECT * FROM TASK WHERE ARCHIVE= 0 ";
    db.all(selectSql, (err, rows) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.send(rows);
      }
    });
})

//gets task that user clicks on using the ID and checks difficulty level to add score
app.get('/tasks/:id', (req,res)=>{
    id = req.params.id
    const selectSql = `SELECT * FROM TASK WHERE ID = ${id} ` ;
    db.all(selectSql, (err, rows) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.send(rows);
      }
    });
})

app.get('/user/:id', (req,res)=>{
  id = req.params.id
  const selectSql = `SELECT * FROM TASK WHERE USER_ID = "${id}" ` ;
  db.all(selectSql, (err, rows) => {
    if (err) {
      return console.error(err.message);
    } else {
      res.send(rows);
    }
  });
})

// app.put('/delete', (req,res)=>{
//   archive = req.body.
//   const selectSql=''
// })

app.get('/delete', (req,res)=>{
  //where archived = 'false' - alter sql
  const selectSql = "SELECT * FROM TASK WHERE ARCHIVE= 0";
  db.all(selectSql, (err, rows) => {
    if (err) {
      return console.error(err.message);
    } else {
      res.send(rows);
    }
  });
})

//sets archive to true for specific id when delete button is clicked 
app.put("/delete/:id", function (req, res) {
  const index = req.params.id;
  db.run(
    `UPDATE task SET ARCHIVE = 1 WHERE ID ="${index}"`
  );
  const selectSql = `SELECT * FROM TASK WHERE ID="${index}"`;
  db.all(selectSql, (err, rows) => {
    if (err) {
      return console.error(err.message);
    } else {
      res.send(rows);
    }
  });
});

// app.put("/users", function(req,res){
//   db.run(`UPDATE users SET SCORE =  ${score} WHERE ID = 1`)
// })



// app.put("/checkbox/:id", function (req, res) {
//   const index = req.params.id;
//   db.run(
//     `UPDATE task SET IMAGE_LINK = "${req.body.imageLink}" WHERE ID ="${index}"`
//   );
//   const selectSql = `SELECT * FROM TASK WHERE ID="${index}"`;
//   db.all(selectSql, (err, rows) => {
//     if (err) {
//       return console.error(err.message);
//     } else {
//       res.send(rows);
//     }
//   });
// });

