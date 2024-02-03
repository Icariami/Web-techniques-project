document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();

    function checkLoginStatus() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "panel.php", true); 
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    updateUserPanel(response.username);
                    displayAnimationData(response.animationData);
                } else {
                    displayLoginInfo();
                }
            }
        };
        xhr.send();
    }

    function updateUserPanel(username) {
        var Container = document.getElementById('Container');
        Container.innerHTML = "<h1>Panel użytkownika " + username + "</h1>";
        Container.style.display = "inline-block";
        var button = document.getElementById('wyloguj');
        button.style.display = "block";
    }

    function displayLoginInfo() {
        var Container = document.getElementById('Container');
        Container.innerHTML = "<p>Aby uzyskać dostęp do panelu użytkownika, zaloguj się.</p>";
        Container.style.display = "inline-block";
        var data = document.getElementById('animation_data');
        data.style.display = "none";
    }

    function displayAnimationData(animationData) {
        var Container = document.getElementById('animation_data');
        Container.innerHTML += "<h2>Zapisane parametry animacji:</h2>";
        if(animationData.length == 0)
            Container.innerHTML += "<p>Nie zapisałeś jeszcze żadnych danych.</p>"

        Container.innerHTML += "<table style='line-height: 10px;'>"
        for (var i = 0; i < animationData.length; i++) {
            var data = animationData[i];
        
            var row = "<tr>";
            row += "<td><strong>" + (i+1) + ". </strong></td>";
            row += "<td>Liczba iteracji: </td><td>" + data.iterations + ", </td>";
            row += "<td>Kąt: </td><td>" + data.angle + ", </td>";
            row += "<td>Krok: </td><td>" + data.add + "</td>";
            row += "</tr></br>";
        
            Container.innerHTML += row;
        }
        Container.innerHTML += "</table>";

        Container.style.display = "inline-block";
        Container.style.boxShadow = "5px 5px 10px darkolivegreen";
        Container.style.borderRadius = "25px";
        Container.style.width = "77%";
        Container.style.fontSize = "21px";
        Container.style.marginTop = "20px";
        Container.style.marginLeft = "10%";
        Container.style.padding = "10px";
        Container.style.textAlign = "center";
        Container.style.lineHeight = "35px";
    }
});

function logoutUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "logout.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                displayLoginInfo();
            } else {
                console.error("Błąd podczas wylogowywania.");
            }
        }
    };
    xhr.send();
}

function displayLoginInfo() {
    var Container = document.getElementById('Container');
    Container.innerHTML = "<p>Aby uzyskać dostęp do panelu użytkownika, zaloguj się.</p>";
    Container.style.display = "inline-block";
    var data = document.getElementById('animation_data');
    data.style.display = "none";
    var button = document.getElementById('wyloguj');
    button.style.display = "none";
}
