document.addEventListener("DOMContentLoaded", () => {

    const cols = [
        document.getElementById("todo"),
        document.getElementById("progress"),
        document.getElementById("done")
    ];

    let dragged = null;

   //task function
    function createTask(title, desc) {
        const div = document.createElement("div");
        div.className = "task";
        div.draggable = true;

        div.innerHTML = `
            <h3>${title}</h3>
            <p>${desc}</p>
            <button>Delete</button>
        `;

        // drag
        div.addEventListener("dragstart", () => {
            dragged = div;
        });

        // delete
        div.querySelector("button").addEventListener("click", () => {
            div.remove();
            updateAll();
        });

        return div;
    }

 //drag event
    function addDragEvents(col) {
        col.addEventListener("dragover", e => e.preventDefault());

        col.addEventListener("dragenter", () => {
            col.classList.add("hover-over");
        });

        col.addEventListener("dragleave", () => {
            col.classList.remove("hover-over");
        });

        col.addEventListener("drop", () => {
            col.appendChild(dragged);
            col.classList.remove("hover-over");
            updateAll();
        });
    }

    cols.forEach(addDragEvents);

  //update count & storagge
    function updateAll() {
        const data = {};

        cols.forEach(col => {
            const tasks = col.querySelectorAll(".task");

            col.querySelector(".right").innerText = tasks.length;

            data[col.id] = Array.from(tasks).map(t => ({
                title: t.querySelector("h3").innerText,
                desc: t.querySelector("p").innerText
            }));
        });

        localStorage.setItem("tasks", JSON.stringify(data));
    }







































    
 //localstorage
    function loadTasks() {
        const saved = JSON.parse(localStorage.getItem("tasks"));

        if (!saved) return;

        cols.forEach(col => {
            const list = saved[col.id] || [];

            list.forEach(t => {
                const task = createTask(t.title, t.desc);
                col.appendChild(task);
            });
        });

        updateAll();
    }

    loadTasks();
//modal
    const modal = document.querySelector(".modal");
    const openBtn = document.getElementById("toggle-modal");
    const closeBg = document.querySelector(".modal .bg");
    const addBtn = document.getElementById("add-new-task");

    openBtn.onclick = () => modal.classList.add("active");
    closeBg.onclick = () => modal.classList.remove("active");

   //add taskk






































































    addBtn.onclick = () => {
        const titleInput = document.getElementById("task-title-input");
        const descInput = document.getElementById("task-description-input");

        const title = titleInput.value.trim();
        const desc = descInput.value.trim();

        if (!title) return alert("Enter title");

        const task = createTask(title, desc);
        document.getElementById("todo").appendChild(task);

        titleInput.value = "";
        descInput.value = "";

        modal.classList.remove("active");

        updateAll();
    };

});