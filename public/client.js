const socket = io()
let name;
var typing=false;
var timeout=undefined;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

function timeoutFunction() {
    socket.emit("typing", false);
  }

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        socket.emit('typing', e.target.value);
        timeout = setTimeout(timeoutFunction, 2000)
        clearTimeout(timeout)
        console.log(timeout)
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    // let className = type
    mainDiv.classList.add(type, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

socket.on('typing', function(data){
    if (data) {
      appendMessage(data)
    } else {
        mainDiv.innerHTML = ''
    }
});
  


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}