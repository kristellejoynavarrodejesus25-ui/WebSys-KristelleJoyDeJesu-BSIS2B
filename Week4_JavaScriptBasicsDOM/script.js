// Clock: run once immediately, then update every second
function updateTitle() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const heading = document.getElementById("heading");
    if (heading) {
        heading.innerText = `Current Time: ${timeString}`;
    }
}
updateTitle();
setInterval(updateTitle, 1000);

// Theme Toggle with localStorage
const themeButton = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

// Add Task (Safe from HTML injection)
const addTaskBtn = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

if (addTaskBtn) {
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const newTask = document.createElement("li");
        
        // Use textContent to prevent script injection
        const textSpan = document.createElement("span");
        textSpan.textContent = taskText + " ";

        const removeBtn = document.createElement("button");
        removeBtn.className = "removeTask";
        removeBtn.textContent = "Remove";

        newTask.appendChild(textSpan);
        newTask.appendChild(removeBtn);
        taskList.appendChild(newTask);

        taskInput.value = "";
    });
}

// Remove Task via Event Delegation
if (taskList) {
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("removeTask")) {
            event.target.closest("li").remove();
        }
    });
}

// Contact Form & Validation Modal
const contactForm = document.getElementById("contactForm");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("email");
        const email = emailInput ? emailInput.value.trim() : "";

        // Basic format check
        if (!email.includes("@") || !email.includes(".")) {
            modalMessage.innerText = "Invalid email format!";
        } else {
            modalMessage.innerText = "Form Submitted Successfully!";
            contactForm.reset(); // Clears form fields after success
        }

        modal.style.display = "block";
    });
}

// Close Modal
const closeModalBtn = document.getElementById("closeModal");
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

// Close modal if clicking anywhere outside the modal content box
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("keydown", function (event) {
    // Prevent trigger when typing in forms
    const activeTag = document.activeElement.tagName.toLowerCase();
    if (activeTag === "input" || activeTag === "textarea") {
        return;
    }

    const key = event.key.toLowerCase();

    switch (key) {
        case "b":
            document.body.style.backgroundColor = "#091a47"; // Blue
            break;
        case "g":
            document.body.style.backgroundColor = "#7bd49f"; // Green
            break;
        case "r":
            document.body.style.backgroundColor = "#4e0d0d"; // Red
            break;
        case "d":
            // Reset to default
            document.body.style.backgroundColor = document.body.classList.contains("dark-mode") 
                ? "#121212" 
                : "#f0f0f0";
            break;
    }
});