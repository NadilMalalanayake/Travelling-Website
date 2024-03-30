const form = document.getElementById("comment-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        alert("Please fill out all required fields.");
    } else {
        alert("Thank you for your feedback!");

    }
});