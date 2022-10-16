
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
    res.sendFile(path.join(__dirname, "src/menu/menu.html"))
});

app.use(express.static(__dirname + "/src"));

app.get("/Szabalyok", (req,res) =>
{
    res.sendFile(path.join(__dirname, "src/rules/szabalyok.html"))
});

app.get("/Jatek", (req,res) =>
{
    res.sendFile(path.join(__dirname, "src/index.html"))
});

var playercount = 0;
var playerlist = [4];
var pool = 0;
var blind = 0;

    io.on("connection" , socket =>
    {

        
        if(playercount < 4)
        {
            playercount++
            playerlist[playercount-1] = socket.id
         
            //pool and balance stuff
            var egyenleg = 1000
           
            
            socket.on("bet", (mennyi) =>
            {
                if(egyenleg-mennyi >=0)
                {
                    pool+= eval(mennyi)
                    egyenleg -= mennyi
                    socket.emit("bal_ref", egyenleg)
                    io.emit("pool_ref", pool)
                }
                else
                {
                    socket.emit("error", "Nince elég pénzed")
                }
            })


            console.log(blind)
            console.log(playercount-1)
            if(playercount-1 == blind)
            {
                socket.emit("setup", "blind")
            }
            else
            {
                socket.emit("setup", "player")
            }

        
           
            
            socket.on("request_cards", () =>{

                var number = playernumber(socket.id, playerlist);
                socket.emit("cards", ertekek[number*3][0], ertekek[number*3+1][0], ertekek[number*3+2][0])
                console.log(valuecards(number))
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

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


let ertekek = [
    ["Tell-A-0A.png", 11, "MAKK", "ASZ"],
    ["Tell-A-07.png", 7,  "MAKK", "HET"],
    ["Tell-A-08.png", 8,  "MAKK", "NYOLC"],
    ["Tell-A-09.png", 9,  "MAKK", "KILENC"],
    ["Tell-A-10.png", 10, "MAKK", "TIZ"],
    ["Tell-A-J1.png", 10, "MAKK", "ALSO"],
    ["Tell-A-J2.png", 10, "MAKK", "FELSO"],
    ["Tell-A-KI.png", 10, "MAKK", "KIRALY"],
    ["Tell-B-0A.png", 11, "TOK", "ASZ"],
    ["Tell-B-07.png", 7,  "TOK",  "HET"],
    ["Tell-B-08.png", 8,  "TOK",  "NYOLC"],
    ["Tell-B-09.png", 9,  "TOK",  "KILENC"],
    ["Tell-B-10.png", 10, "TOK",  "TIZ"],
    ["Tell-B-J1.png", 10, "TOK",  "ALSO"],
    ["Tell-B-J2.png", 10, "TOK",  "FELSO"],0
    ["Tell-B-KI.png", 10, "TOK",  "KIRALY"],
    ["Tell-H-0A.png", 11, "SZIV", "ASZ"],
    ["Tell-H-07.png", 7, "SZIV", "HET"],
    ["Tell-H-08.png", 8, "SZIV", "NYOLC"],
    ["Tell-H-09.png", 9, "SZIV", "KILENC"],
    ["Tell-H-10.png", 10, "SZIV", "TIZ"],
    ["Tell-H-J1.png", 10, "SZIV", "ALSO"],
    ["Tell-H-J2.png", 10, "SZIV", "FELSO"],
    ["Tell-H-KI.png", 10, "SZIV", "KIRALY"],
    ["Tell-L-0A.png", 11, "OSZ", "ASZ"],
    ["Tell-L-07.png", 7,  "OSZ",  "HET"],
    ["Tell-L-08.png", 8,  "OSZ",  "NYOLC"],
    ["Tell-L-09.png", 9,  "OSZ",  "KILENC"],
    ["Tell-L-10.png", 10, "OSZ",  "TIZ"],
    ["Tell-L-J1.png", 10, "OSZ",  "ALSO"],
    ["Tell-L-J2.png", 10, "OSZ",  "FELSO"],
    ["Tell-L-KI.png", 10, "OSZ",  "KIRALY"],
];
ertekek = shuffle(ertekek);


function valuecards(playernumber)
{

var szinertek = new Array(
    0, //MAKK
    0, //TOK
    0, //SZIV
    0, //OSZ
    0, //sor
)

    for (var i = 0; i < 3; i++) {
        if(ertekek[playernumber*3+i][2] === "MAKK"){
            szinertek[0] += ertekek[playernumber*3+i][1];
        }else if(ertekek[playernumber*3+i][2] === "TOK"){
            szinertek[1] += ertekek[playernumber*3+i][1];
        }
        else if(ertekek[playernumber*3+i][2] === "SZIV"){
            szinertek[2] += ertekek[playernumber*3+i][1];
        }
        else if(ertekek[playernumber*3+i][2] === "OSZ"){
            szinertek[3] += ertekek[playernumber*3+i][1];
        }
    }

    if (ertekek[playernumber*3][3] === ertekek[6][3] && ertekek[6][3] === ertekek[7][3]) {


        if (ertekek[playernumber*3][3] == "HET") {
            szinertek[4] = 30.1;
        } else if (ertekek[playernumber*3][3] == "NYOLC") {
            szinertek[4] = 30.2;
        } else if (ertekek[playernumber*3][3] == "KILENC") {
            szinertek[4] = 30.3;
        } else if (ertekek[playernumber*3][3] == "TIZ") {
            szinertek[4] = 30.4;
        } else if (ertekek[playernumber*3][3] == "ALSO") {
            szinertek[4] = 30.5;
        } else if (ertekek[playernumber*3][3] == "FELSO") {
            szinertek[4] = 30.6;
        } else if (ertekek[playernumber*3][3] == "KIRALY") {
            szinertek[4] = 30.7;
        } else if (ertekek[playernumber*3][3] == "ASZ") {
            szinertek[4] = 30.8;
        }


    }
    return Math.max.apply(null, szinertek);

    for(var i = 0; i < szinertek.length; i++)
    {
        szinertek[i] = 0;
    }
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

      
