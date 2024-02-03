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
                messageContainer.textContent = "Pomyślnie zalogowano użytkownika!";
                messageContainer.style.display = "inline-block";
            } else if (response.success == "zlehaslo"){
                messageContainer.textContent = "Nieprawidlowe haslo";
                messageContainer.style.display = "inline-block";
            } else {
                messageContainer.innerHTML = "Brak użytkownika o podanej nazwie. Zarejestruj się.";
                messageContainer.style.display = "inline-block";
            }
        }
    };

    var params = "username=" + username + "&password=" + password;
    xhr.send(params);
}
