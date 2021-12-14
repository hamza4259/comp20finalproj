//get required variables
const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    //if the user input is not empty, active or deactive button
    if(userData.trim() != 0){
        addButton.classList.add("active"); 
    }
    else{
        addButton.classList.remove("active");
    }
}

showTasks();
//function is activated when the user clicks the button
addButton.onclick = () =>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

//show all of the tasks that have been added to the local database
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    let newLiTag = '<li>Eat 30 grams of protein<span onclick = "deleteTask(${index})"; ><i class = "far fa-check-circle"></i></span></li>' + 
    '<li>Run 5 miles <span onclick = "deleteTask(${index})"; ><i class = "far fa-check-circle"></i></span></li>';
    listArr.forEach((element, index) => {
        newLiTag +=`<li>${element} <span onclick = "deleteTask(${index})"; ><i class = "far fa-check-circle"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    //clear box
    inputBox.value = ""; 
}

//function to delete tasks
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

//displaying date in header
const dates = document.getElementById("date");

//Display date
const date_options = {weekday: "long", month:"numeric", day:"numeric"};
const date_today = new Date();
//document.getElementById("date").innerHTML = date_today;
dates.innerHTML = date_today.toLocaleDateString("en-US", date_options);
