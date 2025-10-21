const API_BASE = "https://azisglobalportal.onrender.com/api/staff";

const signInForm = document.getElementById("signInForm");
const signOutBtn = document.getElementById("signOutBtn");
const message = document.getElementById("message");
const staffTableBody = document.querySelector("#staffTable tbody");
const filterWarehouse = document.getElementById("filterWarehouse");
const warehouseSelect = document.getElementById("warehouse");
const nameSelect = document.getElementById("name");
const staffIdInput = document.getElementById("staffId");

// ✅ When warehouse changes, fetch staff for that warehouse
warehouseSelect.addEventListener("change", async () => {
  const warehouse = warehouseSelect.value;
  nameSelect.innerHTML = '<option value="">Select Staff</option>';
  staffIdInput.value = "";

  if (!warehouse) return;

  try {
    const res = await fetch(
      `${API_BASE}/warehouse/${encodeURIComponent(warehouse)}`
    );
    const staffList = await res.json();

    if (!res.ok) throw new Error("Failed to fetch staff");

    staffList.forEach((staff) => {
      const option = document.createElement("option");
      option.value = staff.name;
      option.textContent = staff.name;
      option.dataset.staffId = staff.staffId;
      nameSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading staff list:", err);
  }
});

// ✅ When staff name is selected, fill in Staff ID automatically
nameSelect.addEventListener("change", () => {
  const selected = nameSelect.selectedOptions[0];
  staffIdInput.value = selected?.dataset.staffId || "";
});

// ✅ Sign In
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const staff = {
    name: nameSelect.value,
    warehouse: warehouseSelect.value,
    staffId: staffIdInput.value,
  };

  try {
    const res = await fetch(`${API_BASE}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staff),
    });
    const data = await res.json();

    if (res.ok) {
      message.textContent = "✅ Signed in successfully!";
      message.style.color = "green";
      signInForm.reset();
      nameSelect.innerHTML = '<option value="">Select Staff</option>';
    } else {
      message.textContent = "❌ " + (data.msg || data.error);
      message.style.color = "red";
    }
  } catch (err) {
    message.textContent = "❌ Network error.";
  }
});

// ✅ Sign Out
signOutBtn.addEventListener("click", async () => {
  const staffId = prompt("Enter your Staff ID to sign out:");
  if (!staffId) return;

  try {
    const res = await fetch(`${API_BASE}/signout/${staffId}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (res.ok) {
      message.textContent = "✅ Signed out successfully!";
      message.style.color = "green";
    } else {
      message.textContent = "❌ " + (data.msg || data.error);
      message.style.color = "red";
    }
  } catch (err) {
    message.textContent = "❌ Network error.";
  }
});
