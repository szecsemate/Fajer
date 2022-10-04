var socket = undefined;

window.onload = function()
{
    socket = io();
    socket.on("connect",() =>
    {
        console.log(socket.id);
    })
    
   
    
    socket.on("receive-chat", (string) => {
        console.log(string)
        appendMessage(string)
    })
}



function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    const messageContainer = document.getElementById("menu")
    messageContainer.append(messageElement)
    document.getElementById("uzenet").value = ""
  } 

  function sendmessage()
  {

      socket.emit("send-chat", document.getElementById("uzenet").value)
  }