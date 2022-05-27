
class Score {
  score = 0
  // constructor(score){
  //     score = this.score
  // }
  
  
  addScore() {
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
      const inputDiv = document.createElement("div")
      inputDiv.setAttribute("id","task-css")
      const taskNameElement = document.createElement("INPUT");
      taskNameElement.setAttribute("id", "task-list-item" + data.ID);
      taskNameElement.setAttribute("type", "checkbox");
      taskNameElement.setAttribute("disabled", "true");
      taskNameElement.setAttribute("class", data.ID);
      taskNameElement.style.padding = "50px"

      const taskLabel = document.createElement("label");
      taskLabel.setAttribute("for", "task-list-item" + data.ID);
      taskLabel.setAttribute("id", "task-label"+data.ID)
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
      taskDelete.innerHTML = "DEL"

    //   let app = document.getElementById("app")
    
      // app.appendChild(taskNameElement);
      // app.appendChild(taskLabel);
      // app.appendChild(taskImage);
      // app.appendChild(taskDelete)
      // app.appendChild(break13);
      app.appendChild(inputDiv)
      inputDiv.appendChild(taskNameElement);
      inputDiv.appendChild(taskLabel);
      inputDiv.appendChild(taskImage);
      inputDiv.appendChild(taskDelete)
      inputDiv.appendChild(break13);

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
    saveImage(id)
    let score = await addScore(id)
    const scoreDiv = document.getElementById("score")
    scoreDiv.innerHTML = "SCORE: "+`${score}`

  } else {
    document.getElementById("task-list-item").checked = false;
    // let score = await addScore()
    // const scoreDiv = document.getElementById("score")
    // scoreDiv.innerHTML = " "
  }
}

function saveImage(id) {
  img = document.getElementById("task-image" + id).value
  console.log(img)
  axios
    .post("http://localhost:3001/tasks", {
      headers: {
        'Content-Type': 'multipart/form-data'
    }
    })
    .then(console.info)
    .catch(console.error);
  }
  
  


async function deleteTask(button) {
  let id = button.getAttribute("class")
  console.log(id)
 try{
  let result = await axios.put(`http://localhost:3001/delete/` + id) //change to /:id ??
  result.data.forEach((data) =>{
    console.log("delete")
    // let del1 = document.getElementById("task-list-item"+id)
    // del1.remove()
    // let del2 = document.getElementById("task-image"+id)
    // del2.remove()
    // let del3 = document.getElementById("task-delete"+id)
    // del3.remove()
    // let del4 = document.getElementById("task-label"+id)
    // del4.remove()
    let del=document.getElementById("task-css")
    del.remove()
    })
}catch(error){
  console.log(error)
}

}

let score=0
async function addScore(id){
  

    // let userScore = await axios.get("http://localhost:3001/users/")
    // userScore.data.forEach((data) =>{
    //   let score = data.SCORE
    //   console.log(score)
    // })
    
    try{
        let result = await axios.get(`http://localhost:3001/tasks/` + id) //change to /:id ??
        // let score = 0
        result.data.forEach((data) =>{
            if (data.DIFFICULTY_LEVEL == "Easy") {
            score += 10;
            // axios.put(`http://localhost:3001/users/`)
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

//filter out tasks and score according to user
async function taskPage(){
      try{
        var un=document.forms["myForm"]["uname"].value
        var pw=document.forms["myForm"]["psw"].value
        let result = await axios.get("http://localhost:3001/users")
        console.log(result.data)
        result.data.forEach((data) =>{
          data.ID
          if(data.NAME ==un && data.PASSWORD == pw){
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


// async function checkImage(id){
//   try{
//     let result=await axios.get(`http://localhost:3001/tasks/` + id)
//     result.data.forEach((data)=>{
//       if(data.IMAGE_LINK != NULL){
        
//       }
      
//     })

//   }
//   catch(error){
//     console.log(error)
//   }
// }