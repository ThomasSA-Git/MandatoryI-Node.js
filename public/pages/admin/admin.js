

const loginBtn = document.getElementById("loginBtn");

// Eventlistener for login button
loginBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
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
        return response.json();
      })
      .then((result) => {
      
          // redirects with the url (string) provided in the response.
          window.location.href = result.redirect;
     
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });