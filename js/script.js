console.log("Tekano Eats website loaded successfully");

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("enquiryForm");
  
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;
  
        if (name === "" || email === "" || message === "") {
          alert("Please fill in all fields.");
        } else {
          alert("Thank you " + name + ", your enquiry has been received!");
          form.reset();
        }
      });
    }
  
  });

  const messageBox = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  messageBox.style.color = "green";
  messageBox.textContent = "✅ Order received! We will contact you shortly.";

  form.reset();
});

  const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("cname").value;

    alert("Message sent successfully. We will contact you soon, " + name + ".");
    contactForm.reset();
  });
}

if (name === "") {
    document.getElementById("nameError").textContent = "Name is required";
  }

  const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});