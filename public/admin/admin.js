const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    
    const loginData = {
        userName,
        password
    };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        console.log(response.json);
        return response.json();
      })
      .then((result) => {
        window.location.href = "/admin/adminpage";
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });