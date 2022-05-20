// const express = require('express')

// const app = express()
// const port = 3000 //common practice for local hosts - certain ports are reserved for other things

// app.use(express.static('public')) //folder name

// app.listen(port,()=>{
//     console.log(`Server listening at http://localhost:${port}`)
// })

//postman
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())

// // Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

// const { check, validationResult } = require('express-validator');

// app.post('/restaurants', [
//     check('name').not().isEmpty().trim().escape()
// ], async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }else{
//         res.sendStatus(201)
//     }})
    
// const sqlite3 = require("sqlite3")
// const db = new sqlite3.Database(
// 	"./database.db",
// 	sqlite3.OPEN_READWRITE,
// 	(err) => {
// 		if (err) {
// 			return console.error(err.message);
// 		} else {
// 			console.log("\nSuccess!\n"); 
// 		}
// 	}
// );

// app.use(express.static('public')) //folder name

// app.listen(port,()=>{
//     console.log(`Server listening at http://localhost:${port}`)
// })
