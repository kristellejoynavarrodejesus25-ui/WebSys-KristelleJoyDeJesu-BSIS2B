const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");
const msg = document.getElementById("msg");

function showMessage(text, type = "success") {
msg.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
setTimeout(() => (msg.innerHTML = ""), 2500);
}

async function loadUsers() {
const res = await fetch("/api/users");
const users = await res.json();

userList.innerHTML = "";
if (!users.length) {
userList.innerHTML = `<div class="text-muted">No users yet.</div>`;
return;
}

users.forEach(u => {
const item = document.createElement("div");
item.className = "list-group-item d-flex justify-content-between align-items-center";
item.innerHTML = `
<div>
<div class="fw-semibold">${u.name}</div>
<div class="text-muted">${u.email}${u.age ? " • Age " + u.age : ""}</div>
</div>
<button class="btn btn-sm btn-outline-danger">Delete</button>
`;

item.querySelector("button").addEventListener("click", async () => {
await fetch(`/api/users/${u._id}`, { method: "DELETE" });
showMessage("User deleted", "warning");
loadUsers();
});

userList.appendChild(item);
});
}

userForm.addEventListener("submit", async (e) => {
e.preventDefault();
const formData = new FormData(userForm);
const payload = Object.fromEntries(formData.entries());
if (payload.age === "") delete payload.age;

const res = await fetch("/api/users", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
});

const data = await res.json();
if (!res.ok) {
showMessage(data.error || "Failed to save", "danger");
return;
}

userForm.reset();
showMessage("User saved!");
loadUsers();
});

loadUsers();

async function loadOrders() {
    try {
        const res = await fetch("/api/orders");
        const orders = await res.json();
        
        console.log(orders); // Verify populated data in console

        const container = document.getElementById("orders-container");
        container.innerHTML = "";

        orders.forEach(order => {
            // Map through the populated products array to get their names
            const productNames = order.products.map(p => p.name).join(", ");

            const orderCard = document.createElement("div");
            orderCard.className = "card mb-3 p-3 shadow-sm";
            orderCard.innerHTML = `
                <h5>User: ${order.user ? order.user.name : "Unknown"}</h5>
                <p><strong>Products:</strong> ${productNames}</p>
                <p><strong>Total Amount:</strong> ₱${order.totalAmount}</p>
            `;
            container.appendChild(orderCard);
        });
    } catch (err) {
        console.error("Error loading orders:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    loadOrders();
});


