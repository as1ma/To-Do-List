class User{

    constructor(name){
        name=this.name
    }
    upload(){


    }

    checkBox(){
    

    }
}

class Score extends User{

    score = 0
    constructor(score){
        score = this.score
    }

    addScore(){
        axios.get("http://localhost:3001/tasks")
        .then(function (response) {
        return response.data;
        })  
        .then(function (data){ 
            if (data.DIFFICULTY_LEVEL == "Easy"){
                this.score += 10
            }else if (data.DIFFICULTY_LEVEL == "Medium"){
                this.score += 30
            }else{
                this.score+=50
            }
        }
    )}
}


class Task{
    constructor(task){
        task=this.task
    }
    addTask(){

    }
}

//form inputs to server
function processForm(form) {
    // var data = form;

    axios.post('http://localhost:3001/tasks', {

    name: document.getElementById('task-name').value,
    difficulty: document.getElementById('level').value,
    // imageLink: document.getElementById('task-image').value
    // imagelink???
    })
    .then(console.info)
    .catch(console.error)
}
    

axios.get("http://localhost:3001/tasks")
.then(function (response) {
    return response.data;
})  
.then(function (data){ 
    data.forEach(data => {
    const taskNameElement = document.createElement("INPUT")
    taskNameElement.setAttribute("id","task-list-item")
    taskNameElement.setAttribute("type","checkbox")
     
    const taskLabel = document.createElement('label')
    taskLabel.setAttribute("for", "task-list-item")
    taskLabel.innerHTML= `${data.NAME}`
    const break1 = document.createElement("br")

//     <div>
//     <label for="task-image">Upload an image of Task</label>
//     <input id="task-image" name="image" type="file" accept="image/*" required />
// </div>

    const taskImage = document.createElement("INPUT")
    taskImage.setAttribute("type","file")
    taskImage.setAttribute("id","task-image")
    taskImage.setAttribute("accept","image/*")
    

    // const taskImageLabel=document.createElement("label")
    // taskImageLabel.setAttribute('for',"task-image")


    app.appendChild(taskNameElement)
    app.appendChild(taskLabel)
    app.appendChild(taskImage)
    app.appendChild(break1)
    
    // app.appendChild(taskImageLabel)
})
}).catch(function (error){ 
    console.log(error); 
})

// async function IsCheckboxTicked = true
// await upload Image
// upload image add to database then await checkBox
// check User.upload() == true

//checkbox if image is uploaded
//then add score

// const score1= new Score()
// Score.addScore()