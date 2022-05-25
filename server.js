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

// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (req, fileData, next) => {
//          // this is where your uploaded image file will be saved
//          next(null, path.join(__dirname, 'public', 'uploads'))
//         },
//         filename: (req, fileData, next) => {
//             // name the file however you like I'm using a timestamp
//             next(null, new Date().getTime() + path.extname(fileData.originalname))
//         }
// })
// const images = multer({ storage })
// app.post('/images', images.single('image'), (req, res) => {
// console.log(req.body) // here you can access the text field name of the restaurant req.body.name 
// console.log(req.file) // this object is the meta data you need to store/process
// // the uploaded file will be in your `public/uploads` folder (go look!)
// res.sendStatus(201) // 201 is the response code for successfully creating a resource
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

// app.get('/users', async (req, res) => {
 
//   let myVar = await foobar()
//   .then(response => JSON.stringify(response))
//   .then(data => {return JSON.parse(data)});
//     console.log( await foobar());
//   res.send(await foobar());
 
// });

// function foobar(){

//     const selectSql = `SELECT * from users`;
//     return new Promise((res, rej) => {
 
//          db.all(selectSql, (err, rows)=> {
//              if(err){
//                  console.log('Hit rej')
 
//                  rej(new Error(err.message));
//              }else{
//                  console.log('Hit res')
//                  res(rows); 
//              }
//              });
//     });
    
// }
    

app.get('/tasks', (req,res)=>{
    const selectSql = "SELECT * FROM TASK";
    db.all(selectSql, (err, rows) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.send(rows);
      }
    });
})

// app.post("/restaurants", (req, res) => {
//     console.log(req.body); // use the data in req.body to add a new restaurant to the database
//     const sql = `INSERT INTO tasks(NAME, DIFFICULTY_LEVEL) VALUES("${req.body.NAME}","${req.body.DIFFICULTY_LEVEL}")`;
  
//     db.run(sql, (err) => {
//       if (err) {
//         return console.error(err.message);
//       } else {
//         console.log("Rows Created!");
//       }
//     });
//     res.sendStatus(201);
//   });

// app.put("/tasks/:id", function (req, res) {
//     const index = req.params.id;
//     console.log(
//       "Updating Restaurant " +
//         index +
//         " setting Name to " +
//         req.body.NAME +
//         ", setting Imagelink to " +
//         req.body.IMAGELINK
//     );
  
//     db.run(
//       `UPDATE restaurants SET IMAGELINK ="${req.body.IMAGELINK}" WHERE ID ="${index}"`
//     );
//     db.run(
//       `UPDATE restaurants SET NAME = "${req.body.NAME}" WHERE ID = "${index}";`
//     );
