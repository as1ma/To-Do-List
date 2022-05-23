const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err)=>{
    if(err){
        return console.error(err.message)
    }else{
        console.log("Success!!")
    }
})


//CREATING TABLE
// db.run("CREATE TABLE tasks(NAME, DIFFICULTY_LEVEL,IMAGE_LINK)")

//INSERTING NEW VALUES
// const sql = "INSERT INTO users VALUES('Sam', 'Test', 'STest', 'Test123', 'samantha.Test@multiverse.io', 2)"

// db.run(sql, (err)=>{
//     if(err){
//         return console.error(err.message)
//     }else{
//         console.log("Row Created!")
//     }
// });

// SELECTING ROWS TO SEE TABLE
const selectSql = "SELECT * FROM tasks"; db.all(selectSql, (err, rows)=>{
    if(err){
        return console.error(err.message)
    }else{
        rows.forEach((row)=>{
            console.log(row)})
    }
})

 //UPDATING
// const sql = "UPDATE users SET first_name = 'Samantha' WHERE first_name='Sam';"
// db.run(sql, (err)=>{
//     if(err){
//         return console.error(err.message);
//     }else{
//         console.log("Row Updated!");
//     }
//     });
    
//DELETING
// const sql = "DELETE FROM users WHERE first_name='Samantha';"
// db.run(sql, (err)=>{
//     if(err){
//         return console.error(err.message)
//     }else{
//         console.log("Deleted!")
//     }
// });

//CLOSING THE CONNECTION
// db.close((err) =>{
//     if(err){
//         return console.error(err.message);
//     }else{
//         console.log("DB Closed");
//     }
//     });
    

//AUTOINCREMENT
// db.run("CREATE TABLE COMPANY(ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL,AGE INTEGER NOT NULL,ADDRESS,SALARY REAL);");
// db.run("INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY)VALUES ('Jon', 29, 'New York', 35000.00)")

// const selectSql = "SELECT * FROM COMPANY"; db.all(selectSql, (err, rows)=>{
//     if(err){
//         return console.error(err.message)
//     }else{
//         rows.forEach((row)=>{
//             console.log(row)})
//         }
// })


//---------------------------------------------------------------------------------------------------------------------

