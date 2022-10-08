
const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const path = require("path");
const { Console } = require("console");



const port = process.env.port || 3000;

const http = require("http").Server(app);


const io = require("socket.io")(http);


app.get("/", (req,res) =>
{
    console.log("test")
    res.sendFile(path.join(__dirname, "src/menu/menu.html"))
});

app.use(express.static(__dirname + "/src"));

app.get("/Jatek", (req,res) =>
{
    res.sendFile(path.join(__dirname, "src/index.html"))
});

var playercount = 0;
var playerlist = [4];
var pool = 0;

    io.on("connection" , socket =>
    {

        
        if(playercount < 10)
        {
            playercount++
            playerlist[playercount-1] = socket.id
         
            //pool and balance stuff
            var egyenleg = 100
            
            socket.on("bet", (mennyi) =>
            {
                if(egyenleg-mennyi >=0)
                {
                    pool+= eval(mennyi)
                    egyenleg -= mennyi
                    io.emit("refresh", pool, egyenleg)
                }
                else
                {
                    socket.emit("error", "Nince elég pénzed")
                }
            })
            
            socket.on("request_cards", () =>{

                var number = playernumber(socket.id, playerlist);
                socket.emit("cards", cards[number*3], cards[number*3+1], cards[number*3+2])
            })
    
            socket.on("send-chat", (string)=>
            {
            io.emit("receive-chat", string);
            })
        }
        else
        {
            socket.emit("full")
        }
        
    });



http.listen(port, (req,res) =>
{
    console.log("http is listening on port " + port)
});

var cards=new Array(
    "Tell-A-0A.png",
    "Tell-A-07.png",
    "Tell-A-08.png",
    "Tell-A-09.png",
    "Tell-A-10.png",
    "Tell-A-J1.png",
    "Tell-A-J2.png",
    "Tell-A-KI.png",
    "Tell-B-0A.png",
    "Tell-B-0A.png",
    "Tell-B-07.png",
    "Tell-B-08.png",
    "Tell-B-09.png",
    "Tell-B-10.png",
    "Tell-B-J1.png",
    "Tell-B-J2.png",
    "Tell-B-KI.png",
    "Tell-H-0A.png",
    "Tell-H-07.png",
    "Tell-H-08.png",
    "Tell-H-09.png",
    "Tell-H-10.png",
    "Tell-H-J1.png",
    "Tell-H-J2.png",
    "Tell-H-KI.png",
    "Tell-L-0A.png",
    "Tell-L-07.png",
    "Tell-L-08.png",
    "Tell-L-09.png",
    "Tell-L-10.png",
    "Tell-L-J1.png",
    "Tell-L-J2.png",
    "Tell-L-KI.png");
    
    cards = shuffle(cards);

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
          // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

      function playernumber(id, list)
      {
        for(var i= 0; i < list.length; i++)
        {
            if(id == list[i])
            {
                return i;
            }
        }
        return null;
      }

      
