const { default: axios } = require("axios");

class Score {
  constructor(score){
      score = this.score
  }
 
  static addScore() {
      let score = 0
      console.log("hi")
    // return score

    // axios.get('/tasks', (req,res)=>{
    //     const level = "SELECT DIFFICULTY_LEVEL FROM TASK";
    //     db.all(level, (err, rows) => {
    //       if (err) {
    //         return console.error(err.message);
    //       } else {
    //         res.send(rows);
    //       }
    //     });
    // })

    axios.get("http://localhost:3001/tasks")
      .then(function (response) {
        return response.data;
      })
      .then(function (data) {
        data.forEach((data) =>{
            if (data.DIFFICULTY_LEVEL == "Easy") {
            score += 10;
            return score;
            } else if (data.DIFFICULTY_LEVEL == "Medium") {
            score += 30;
            return score;
            } else if (data.DIFFICULTY_LEVEL == "Hard") {
            score += 50;
            return score;
            }
      })
    .catch(function (error) {
        console.log(error);
      });
  })

}
}

  


class User {
  constructor(name, password, score) {
    name = this.name;
    password = this.password;
    score = this.score;
  }
  upload() {
    return false;
  }
}

class Task {
  constructor(task) {
    task = this.task;
  }
  addTask() {}
}

//form inputs to server
function processForm(form) {
  // var data = form;
  console.log(document.getElementById("task-name").value);
  axios
    .post("http://localhost:3001/tasks", {
      name: document.getElementById("task-name").value,
      difficulty: document.getElementById("level").value,
    //   user: document.getElementById("user").value,

      // imageLink: document.getElementById('task-image').value
      // imagelink???
    })
    .then(console.info)
    .catch(console.error);
}

axios.get("http://localhost:3001/tasks")
  .then(function (response) {
    return response.data;
  })
  .then(function (data) {
    data.forEach((data) => {
    if (data.USER_ID == "1" ){
      const taskNameElement = document.createElement("INPUT");
      taskNameElement.setAttribute("id", "task-list-item" + data.ID);
      taskNameElement.setAttribute("type", "checkbox");
      taskNameElement.setAttribute("disabled", "true");
      taskNameElement.setAttribute("class", data.ID);

      const taskLabel = document.createElement("label");
      taskLabel.setAttribute("for", "task-list-item" + data.ID);
      taskLabel.setAttribute("class", data.ID);
      taskLabel.innerHTML = `${data.NAME}`;
      const break13 = document.createElement("br");

      const taskImage = document.createElement("INPUT");
      taskImage.setAttribute("type", "file");
      taskImage.setAttribute("id", "task-image" + data.ID);
      taskImage.setAttribute("accept", "image/*");
      taskImage.setAttribute("class", data.ID);
      // taskImage.setAttribute("required", "true")
      taskImage.setAttribute("onchange", "checkBox(this);");
      // taskImage.setAttribute('onchange',"addScore()"
      
      const taskDelete = document.createElement("button")
      taskDelete.setAttribute("id","task-delete" + data.ID);
      taskDelete.setAttribute("onclick","deleteTask(this)");
      taskDelete.setAttribute("class",data.ID);
      taskDelete.innerHTML = "delete"

    //   let app = document.getElementById("app")
      app.appendChild(taskNameElement);
      app.appendChild(taskLabel);
      app.appendChild(taskImage);
      app.appendChild(taskDelete)
      app.appendChild(break13);
    }
    });
  })
  .catch(function (error) {
    console.log(error);
  });

// async function IsCheckboxTicked {
//checkbox if image is uploaded - "document.getElementById("myCheck").checked = true;"
// if (checkBox.checked == true){
// then add score
// const score1= new Score()
// Score.addScore()
//   }
// }
// await upload Image
// upload image add to database then await checkBox
// OR check User.upload() == true

async function checkBox(imageUploader) {
  if (imageUploader.files.length > 0) {
    
    let id = imageUploader.getAttribute("class");

    document.getElementById("task-list-item" + id).checked = true;
    let score = await addScore(id)
    const scoreDiv = document.getElementById("score")
    scoreDiv.innerHTML = "score: "+`${score}`

  } else {
    document.getElementById("task-list-item").checked = false;
    // let score = await addScore()
    // const scoreDiv = document.getElementById("score")
    // scoreDiv.innerHTML = " "
  }
}

async function deleteTask(button){

  let id = button.getAttribute("class");

  console.log("delete")
  //archive - set to true 
  try{
    let result = await axios.get("http://localhost:3001/delete/" + id)
    console.log(result.data)
    result.data.forEach((data) =>{
        if(data.ARCHIVE == 0 ){
  
        }

    })
  }
 catch(error){
   console.log(error)
  
}

}


async function addScore(id){
    try{
        let userScore = await axios.get("http://localhost:3001/users/" + id)
        userScore.data.forEach((data) =>{
            
        })

    }catch(error){
        console.log(error)
    }

    try{
        let result = await axios.get(`http://localhost:3001/tasks/` + id) //change to /:id ??
        let score = 0
        result.data.forEach((data) =>{
            if (data.DIFFICULTY_LEVEL == "Easy") {
            score += 10;
            data
            console.log(score)
            } else if (data.DIFFICULTY_LEVEL == "Medium") {
            score += 30;
            console.log(score)
            } else if (data.DIFFICULTY_LEVEL == "Hard") {
            score += 50;
            console.log(score)
            }
          })
        return score
    }catch(error){
        console.log(error)
    }
}

// async function getUsers(form){
//     try{
//         // var name = document.getElementById("uname").value;
//         // var pass = document.getElementById("psw").value;

//         // console.log(name);
//         // console.log(pass); 
//         // let name = "asima"
//         // let pass = "123"

//         let result = await axios.get("http://localhost:3001/users")
//         console.log(result.data)
//         result.data.forEach((data) =>{
//           if(data.NAME ==name){
//             console.log("name is right");
//             if(data.PASSSWORD == pass){
//               console.log("password is right")
//             }
//           }else{
//             console.log('no user')
//           }
        
//         })
       
        
//     }catch(error){
//         console.log(error)
//     }
// }

// getUsers()

//filter out tasks and score according to user
async function taskPage(){
    var un=document.forms["myForm"]["uname"].value
    var pw=document.forms["myForm"]["psw"].value


      try{
        var un=document.forms["myForm"]["uname"].value
        var pw=document.forms["myForm"]["psw"].value
        let result = await axios.get("http://localhost:3001/users")
        console.log(result.data)
        result.data.forEach((data) =>{
            data.ID
          if(data.NAME ==un ){
            console.log("name is right");
            window.location.href="index.html"
            
          }else{
            console.log('no user')
          }
        
        })   
    }catch(error){
        console.log(error)
    }  

}