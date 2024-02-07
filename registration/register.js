function registerUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var messageContainer = document.getElementById("registrationMessage");

    messageContainer.textContent = "";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "register.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log('Response:', xhr.responseText);

            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                messageContainer.textContent = "Pomyślnie zarejestrowano użytkownika!";
                messageContainer.style.display = "inline-block";
            } else {
                messageContainer.textContent = "Podana nazwa użytkownika jest już zajęta. Wybierz inną nazwę.";
                messageContainer.style.display = "inline-block";
            }
        }   
    };

    var params = "username=" + username + "&password=" + password;
    xhr.send(params);
}
