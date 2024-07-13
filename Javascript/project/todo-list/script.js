document.addEventListener("DOMContentLoaded", function() {
    const task = document.getElementById("todotask");
    const btn = document.getElementById("addbtn");
    const list = document.getElementById("tasklist");
    

    btn.addEventListener("click", addtodo);

    task.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            addtodo();
        }
    });

    const delbtn = document.getElementById("delbtn");
    delbtn.addEventListener("click",clearAll);

    function clearAll()
    {
        const res=window.confirm("Are you sure you want to clear your entire To-Do List ?");
        if(res){
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        }
    }

    function addtodo() {
        const text = task.value;
        if (text.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        const listItem = document.createElement("li");
        listItem.className = "list-item";

        const listItemText = document.createElement("span");
        listItemText.className = "list-item-text";
        listItemText.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "deletebtn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            list.removeChild(listItem);
        });

        listItem.appendChild(listItemText);
        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);

        task.value="";
        
        console.log("Added task: "+text);
    }
});
