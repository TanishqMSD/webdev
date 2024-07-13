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

    function addtodo() {
        const text = task.value;
        if (text.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        const listItem = document.createElement("li");
        listItem.textContent = text;
        list.appendChild(listItem);
        task.value = ""; // Clear the input field after adding the task
        console.log("Added task: "+text);
    }
});
