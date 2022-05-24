const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err)=>{
    if(err){
        return console.error(err.message)
    }else{
        console.log("Success!!")
    }
})


//CREATING TABLE
// db.run("CREATE TABLE task(NAME, DIFFICULTY_LEVEL, IMAGE_LINK, USER_ID, ID INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY (USER_ID) REFERENCES users(ID))")


// db.run("CREATE TABLE users(NAME,PASSWORD, SCORE, ID INTEGER PRIMARY KEY AUTOINCREMENT)")

// db.run("INSERT INTO users(NAME) VALUES('Nouha')")
// db.run("INSERT INTO users(NAME) VALUES('Asima')")

// db.run("INSERT INTO users (NAME,PASSWORD,SCORE) VALUES('asima','123','0')")

// SELECTING ROWS TO SEE TABLE
const selectSql = "SELECT * FROM task"; db.all(selectSql, (err, rows)=>{
    if(err){
        return console.error(err.message)
    }else{
        rows.forEach((row)=>{
            console.log(row)})
    }
})

// const sql = "DROP TABLE users"; db.run(sql, (err)=>{ if(err) { return console.error(err.message); } else{ console.log("Table deleted!"); } });

 //UPDATING
// const sql = "UPDATE task SET USER_ID = 1 WHERE ID = 1;"
// db.run(sql, (err)=>{
//     if(err){
//         return console.error(err.message);
//     }else{
//         console.log("Row Updated!");
//     }
//     });
    
// DELETING
// const sql = "DELETE FROM tasks WHERE NAME='undefined';"
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

