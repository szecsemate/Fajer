
const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const path = require("path");
const { Console } = require("console");

app.use(express.static("src"))

const port = process.env.port || 3000;

const http = require("http").Server(app);


const io = require("socket.io")(http);

app.get("/", (req,res) =>
{
    console.log("test")
    res.sendFile(path.join(__dirname, "src/index.html"))
});


io.on("connection" , socket =>
{
    console.log(socket.id)

      socket.on("send-chat", (string)=>
      {
      io.emit("receive-chat", string);
      })
});



http.listen(port, (req,res) =>
{
    console.log("http is listening on port " + port)
});

