function loginUser() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var messageContainer = document.getElementById("registrationMessage");

    messageContainer.textContent = "";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "login.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log('Response:', xhr.responseText);
            var response = JSON.parse(xhr.responseText);

            if (response.success == "ok") {
                messageContainer.textContent = "User successfully logged.";
                messageContainer.style.display = "inline-block";
            } else if (response.success == "invalid_password"){
                messageContainer.textContent = "Invalid password.";
                messageContainer.style.display = "inline-block";
            } else {
                messageContainer.innerHTML = "No user found with the provided username. Please register.";
                messageContainer.style.display = "inline-block";
            }
        }
    };

    var params = "username=" + username + "&password=" + password;
    xhr.send(params);
}
