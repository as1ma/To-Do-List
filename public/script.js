class Score {

    // static hello(){
    //     return 'hello'
    // }

    static addScore() {

        axios.get("http://localhost:3001/tasks")
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                let score = 0
                if (data.DIFFICULTY_LEVEL == "Easy") {
                    score += 10
                    return score
                } else if (data.DIFFICULTY_LEVEL == "Medium") {
                    score += 30
                    return score
                } else if (data.DIFFICULTY_LEVEL == 'Hard') {
                    score += 50
                    return score
                }
            }).catch(function (error) {
                console.log(error);
            })
    }
}

class User {

    constructor(name, password, score) {
        name = this.name
        password = this.password
        score = this.score
    }
    upload() {
        return false
    }

}

class Task {
    constructor(task) {
        task = this.task
    }
    addTask() {

    }
}

//form inputs to server
function processForm(form) {
    // var data = form;
    console.log(document.getElementById('task-name').value);
    axios.post('http://localhost:3001/tasks', {

        name: document.getElementById('task-name').value,
        difficulty: document.getElementById('level').value,
        user: document.getElementById('user').value

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
    .then(function (data) {
        data.forEach(data => {
            const taskNameElement = document.createElement("INPUT")
            taskNameElement.setAttribute("id", "task-list-item")
            taskNameElement.setAttribute("type", "checkbox")
            taskNameElement.setAttribute("disabled", "true")

            const taskLabel = document.createElement('label')
            taskLabel.setAttribute("for", "task-list-item")
            taskLabel.innerHTML = `${data.NAME}`
            const break1 = document.createElement("br")

            const taskImage = document.createElement("INPUT")
            taskImage.setAttribute("type", "file")
            taskImage.setAttribute("id", "task-image")
            taskImage.setAttribute("accept", "image/*")
            // taskImage.setAttribute("required", "true")
            taskImage.setAttribute("onchange", "checkBox(this);")
            // taskImage.setAttribute('onchange',"addScore()"

            app.appendChild(taskNameElement)
            app.appendChild(taskLabel)
            app.appendChild(taskImage)
            app.appendChild(break1)
        })
    }).catch(function (error) {
        console.log(error);
    })


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



function checkBox(imageUploader) {
    if (imageUploader.files.length > 0) {
        document.getElementById("task-list-item").checked = true;

        //asyncImageCheck()
    }
    else {
        document.getElementById("task-list-item").checked = false;
    }
}



//login stuff
function processLogin() {
    console.log("...");
    axios.post('http://localhost:3001/users', {

        user: document.getElementById('uname').value,
        password: document.getElementById('psw').value
    })
        .then(console.info)
        .catch(console.error)

    try {
        response = await axios.get("http://localhost:3001/users")
        console.log(response.data);
    }
    catch (error) {
        console.log(error);
    }

    axios.get("http://localhost:3001/users")
        .then(function (response) {
            console.log(response);
            console.log(response.data);
            return response.data;
        })
        .then(function (data) {
            var name = document.getElementById('uname').value
            var pass = document.getElementById('psw').value

            console.log(name);
            console.log(pass);

            if (data.NAME == name) {
                console.log("name is right")

                if (data.PASSWORD == pass) {
                    console.log("password also right")
                }
            }
            else {
                console.log("no user")

            }

        }
        )
        .catch(error)
    {
        console.log(error);
    }
}
//check if username and password match database
//filter out tasks and score according to user
