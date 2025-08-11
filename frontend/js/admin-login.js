document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("adminName").value.trim();
  const pass = document.getElementById("adminPass").value;

  const adminUser = "admin";
  const adminPassword = "admin123"; 

  if (name === adminUser && pass === adminPassword) {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "admin.html";
  } else {
    document.getElementById("adminMessage").innerText = "❌ Invalid admin credentials!";
  }
});
