const canvas = document.getElementById("spiral");
const context = canvas.getContext("2d");

function getParameters() {
    const iter = parseFloat(document.getElementById("iterations").value);
    const angle = parseFloat(document.getElementById("angle").value);
    const add = parseFloat(document.getElementById("add").value);
    animateSpiral(iter, angle, add);
}

function animateSpiral(iter, angle, add) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    context.clearRect(0, 0, w, h);
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = 'rgb(48, 65, 19)';
    animate(iter, angle, add, w, h);
}

function animate(iter, angle, add, w, h) {
    const turn = Math.PI * angle / 180;
    var x = 0.5 * w;
    var y = 0.5 * h;
    var step = 5;
    var start_angle = 5;
    var currentIteration = 0;

    function drawFrame() {
        if (currentIteration >= iter) return;
        x = x + step * Math.cos(start_angle);
        y = y + step * Math.sin(start_angle);
        context.lineTo(x, y);
        start_angle += turn;
        step += add;
        context.stroke();
        currentIteration++;
        requestAnimationFrame(drawFrame);
    }

    context.moveTo(x, y);
    drawFrame();
}

function saveData() {
    var iterations = document.getElementById("iterations").value;
    var angle = document.getElementById("angle").value;
    var add = document.getElementById("add").value;
    var Container = document.getElementById("spiralContainer");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_animation.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log('Response:', xhr.responseText);

            try {
                var response = JSON.parse(xhr.responseText);
                if (response.success == true) {
                    Container.textContent = "Zapisano dane do panelu użytkownika.";
                    Container.style.display = "block";
                    Container.style.marginBottom = "20px";
                } else if (response.success == "niezalogowany"){
                    Container.textContent = "Aby zapisać dane, zaloguj się.";
                    Container.style.display = "block";
                                       
                }
            } catch (e) {
                console.error('Błąd parsowania JSON:', e);
            }
            
        }
    };

    var params = "iterations=" + iterations + "&angle=" + angle + "&add=" + add;
    xhr.send(params);
}


function loadSavedAnimation() {
    console.log("Function loadSavedAnimation() called");
    var animationNumber = document.getElementById('animationNumber').value;

    if (animationNumber > 0 ) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "load_animation.php?animationNumber=" + animationNumber, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    var loadedAnimationData = response.animationData;
                    if(animationNumber <= loadedAnimationData.length) {
                        console.log(loadedAnimationData[animationNumber-1]);
                        document.getElementById('iterations').value = loadedAnimationData[animationNumber-1].iterations;
                        document.getElementById('angle').value = loadedAnimationData[animationNumber-1].angle;
                        document.getElementById('add').value = loadedAnimationData[animationNumber-1].add;
                    } else {
                        alert("Nie ma wiersza o podanym numerze. Wprowadź poprawny numer animacji")
                    }
                } else {
                    alert("Zaloguj się i zapisz dane, aby móc je wczytać.");
                }
            }
        };
        console.log("Request sent");
        xhr.send();
    } else {
        alert("Wprowadź poprawny numer animacji");
    }
}


