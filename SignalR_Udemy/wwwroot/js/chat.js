var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.start().then(function () {
    //document.getElementById("sendButton").disabled = false;

    const userFromInput = document.getElementById('tbUserFrom');
    const messageInput = document.getElementById('tbMessage');
    const sendButton = document.getElementById('sendButton');

    function ValidateInputs() {
        const userFromValue = userFromInput.value.trim();
        const messageValue = messageInput.value.trim();

        // Habilitar el botón solo si ambos campos tienen contenido
        sendButton.disabled = !(userFromValue && messageValue);

        if (sendButton.disabled) {
            sendButton.classList.remove('enabled');
            sendButton.classList.add('disabled');
        } else {
            sendButton.classList.remove('disabled');
            sendButton.classList.add('enabled');
        }
    }

    // Agregar event listeners para validar cada vez que cambia el contenido de los inputs
    userFromInput.addEventListener('input', ValidateInputs);
    messageInput.addEventListener('input', ValidateInputs);

    ValidateInputs();
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveMessage", function (user, message) {
    //var encodedMsg = user + ": " + message;
    //var li = document.createElement("li");
    //li.textContent = encodedMsg;
    //document.getElementById("messagesList").appendChild(li);

    var info = "<b><u>" + user + "</u>:</b> " + message + " <span style='font-size: 0.6em;'>(" + obtenerHoraActual() + ")</span>" + "<br>";
    document.getElementById("printInfo").innerHTML += info;
});


function obtenerHoraActual() {
    // Crear un objeto Date para obtener la hora actual
    let now = new Date();

    // Obtener las horas y minutos
    let horas = now.getHours();
    let minutos = now.getMinutes();

    // Determinar si es AM o PM
    const ampm = horas >= 12 ? 'pm' : 'am';

    // Convertir a formato de 12 horas
    horas = horas % 12; // Si es mayor a 12, hace el módulo para obtener el rango 0-11
    horas = horas ? horas : 12; // Si la hora es 0, cambiarla a 12 (para medianoche)
    minutos = minutos < 10 ? '0' + minutos : minutos; // Asegurarse de que los minutos tengan dos dígitos

    // Formatear y devolver la hora en formato hh:mm AM/PM
    let tiempo = horas + ':' + minutos + ' ' + ampm;
    return tiempo;
}



document.getElementById("sendButton").addEventListener("click", function (event) {
    var userfrom = document.getElementById("tbUserFrom").value;
    var message = document.getElementById("tbMessage").value;
    var roomName = document.getElementById("tbRoom").value;
    var username = document.getElementById("tbUserTo").value;

    if (username) {
        connection.invoke("SendMessageToUser", userfrom, message, username).catch(function (err) {
            return console.error(err.toString());
        });
    } else if (roomName) {
        connection.invoke("SendMessageToRoom", userfrom, message, roomName).catch(function (err) {
            return console.error(err.toString());
        });
    } else {
        connection.invoke("SendMessage", userfrom, message).catch(function (err) {
            return console.error(err.toString());
        });
    }

    event.preventDefault();
});


document.getElementById("btnJoinRoom").addEventListener("click", function (event) {
    var toogleRoom = document.getElementById("tbToogleRoom").value;

    connection.invoke("JoiningRoom", toogleRoom).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});


document.getElementById("btnLeaveRoom").addEventListener("click", function (event) {
    var toogleRoom = document.getElementById("tbToogleRoom").value;

    connection.invoke("LeavingRoom", toogleRoom).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});


document.getElementById("btnJoinPrivateChat").addEventListener("click", function (event) {
    var username = document.getElementById("tbJoinPrivateChat").value;

    connection.invoke("JoiningUserToPrivateChat", username).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});