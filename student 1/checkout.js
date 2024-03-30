
function validateForm() {
    var name = document.getElementById("firstname").value;
    if (name == "") {
      alert("Name must be filled out");
      return false;
    }
  }