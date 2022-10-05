var egyenleg = 100;
var bent_van = 0;

document.getElementById("balance").innerHTML = "Egyenleged: ".concat(egyenleg).concat("Ft");

var socket = undefined;

var Kartya1
var Kartya2
var Kartya3

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

    socket.on("cards", (kartya1, kartya2, kartya3) => {
        Kartya1 = kartya1
        Kartya2 = kartya2
        Kartya3 = kartya3
    })

    socket.on("full", () =>
    {
        alert("You fucked up")
        window.location.replace("/menu/menu.html")
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


  function emel()
  {
    var mennyivel = emeles_lekeres()
    bent_van += mennyivel 

    socket.emit("bet", mennyivel)

    egyenleg -= mennyivel
    document.getElementById("balance").innerHTML = "Egyenleged: ".concat(egyenleg).concat("Ft");
  }

  function megnez() {
    document.getElementById("imgHand1").src = "cards/" + Kartya1;
    document.getElementById("imgHand2").src = "cards/" + Kartya2;
    document.getElementById("imgHand3").src = "cards/" + Kartya3;
    document.getElementById("megnezem").blur();
}