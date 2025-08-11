document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        window.location.href = "home.html"; // ✅ redirect
      } else {
        document.getElementById("message").innerText = data.error || "Login failed";
      }
    } catch (err) {
      console.error("Login error:", err);
      document.getElementById("message").innerText = "Server error. Try again.";
    }
  });
});


