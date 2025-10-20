function updateDateTime() {
  const now = new Date();

  // Format date/time
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formatted = now.toLocaleString("en-NZ", options);

  // Choose greeting based on time
  const hour = now.getHours();
  let greeting;
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // Update page
  document.getElementById("greeting").textContent = greeting;
  document.getElementById("datetime").textContent = formatted;
}

// Update every second
setInterval(updateDateTime, 1000);
updateDateTime();
