document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
    birth_date: form.birth_date.value,
  };

  try {
    const res = await fetch("http://localhost:3000/api/users/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
    const text = await res.text();  
    console.log("Raw response:", text);
    const result = JSON.parse(text);
    document.getElementById("result").innerText = result.message || result.error;
  } catch (error) {
    console.error("🔴 Error during signup:", error.message);
    document.getElementById("result").innerText = "An error occurred. Check console.";
  }
});
