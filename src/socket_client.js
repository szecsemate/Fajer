var egyenleg = 1000;
var bent_van = 0;

document.getElementById("balance").innerHTML = "Egyenleged: ".concat(egyenleg).concat("Ft");

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

   

    socket.on("full", () =>
    {
        alert("You fucked up")
        window.location.replace("/menu/menu.html")
    })

    socket.on("bal_ref",(egyenleg) =>{
        document.getElementById("balance").textContent = "Egyenleged: ".concat(egyenleg).concat("Ft");
    })

    socket.on("pool_ref",(pool_value) =>{
        document.getElementById("bet_pool").textContent = pool_value
        console.log(pool_value)
    })
    socket.on("error",(message) =>{
        alert(message)
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


  //akkor fut ha a emel gombot megnyomják
  function emel()
  {
    var mennyivel = emeles_lekeres()
    socket.emit("bet", mennyivel)
  }


  //akkor fut ha a megnézem/dobom gombot megnyomják
  function megnez_dob() { 
    var gomb = document.getElementById("megnezem")
    if(gomb.innerHTML != "Dobom")
    {
        gomb.innerHTML="Dobom";

        socket.emit("request_cards");
        socket.on("cards", (kartya1, kartya2, kartya3) => {
            document.getElementById("imgHand1").src = "cards/" + kartya1;
            document.getElementById("imgHand2").src = "cards/" + kartya2;
            document.getElementById("imgHand3").src = "cards/" + kartya3;
            document.getElementById("megnezem").blur();
        })
    }
    else
    {
        document.getElementById("imgHand1").style.filter = "brightness(20%)"
        document.getElementById("imgHand2").style.filter = "brightness(20%)"
        document.getElementById("imgHand3").style.filter = "brightness(20%)"
        document.getElementById("megnezem").disabled = true;
        document.getElementById("megnezem").style.filter =  "brightness(40%)";
        document.getElementById("emelek").disabled = true;  
        document.getElementById("emelek").style.filter =  "brightness(40%)";
        document.getElementById("megadom").disabled = true; 
        document.getElementById("megadom").style.filter =  "brightness(40%)";
        document.getElementById("bevitel").style.filter =  "brightness(40%)";
    } 
}