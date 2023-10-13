 let form = document.getElementById("form");
 let textInput = document.getElementById("textInput");
 let msg = document.getElementById("msg");
 let dateInput = document.getElementById("dateInput");
 let textarea = document.getElementById("textarea");
 let tasks = document.getElementById("tasks");
 let add = document.getElementById("add");

 form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation();
 })

 let formValidation = ()=>{
    if(textInput.value === ""){
        console.log("failure");
        msg.innerHTML = "please add title";
    }
    else{
        console.log("sucess");
        msg.innerHTML = "";
        acceptData(); 
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (()=>{
            add.setAttribute("data-bs-dismiss", "");
        })( )
    }
 };

 let data = [];

 let acceptData = ()=>{
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data)
    creatTasks();
 };

 let creatTasks = ()=>{
    tasks.innerHTML = "";
    data.map((x, y)=>{
      
        return (tasks.innerHTML += `

        <div id=${y} class="">
               <span class="fw-bold">${x.text}</span>
               <span class="small text-secondary">${x.date}</span>
               <p>${x.description}</p>

               <span class="options">
                   <i  onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="bi bi-pencil-square"></i>
                   <i  onclick="deleteTask(this)" class="bi bi-x-square"></i>
               </span>
           </div>
        
        `);
    })
         reset();
 };

 let reset = ()=>{
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
 };

 let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice( e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log( e.parentElement.parentElement.id);
 };

 let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value =  selectedTask.children[2].innerHTML; 

    deleteTask(e);
 };

 (()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    creatTasks();
    console.log(data);
 })();