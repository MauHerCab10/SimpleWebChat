// Obtener referencias a los elementos
const userFromInput = document.getElementById('tbUserFrom');
const messageInput = document.getElementById('tbMessage');
const sendButton = document.getElementById('sendButton');

// Función para validar los campos y habilitar/deshabilitar el botón
function validateInputs() {
    // Trim elimina espacios en blanco al inicio y final
    const userFromValue = userFromInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Habilitar el botón solo si ambos campos tienen contenido
    sendButton.disabled = !(userFromValue && messageValue);
}

// Agregar event listeners para validar cada vez que cambia el contenido de los inputs
userFromInput.addEventListener('input', validateInputs);
messageInput.addEventListener('input', validateInputs);

// Llamar a la función inicialmente para establecer el estado inicial del botón
validateInputs();