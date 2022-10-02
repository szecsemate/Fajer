

//not yet implemented
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

window.onload = function () {
    /*document.getElementById("imgPool1").src="cards/" + cards[1];
    document.getElementById("imgPool2").src="cards/" + cards[2]; 
    document.getElementById("imgPool3").src="cards/" + cards[3]; 
    document.getElementById("imgPool4").src="cards/" + cards[4]; 

    document.getElementById("imgHand1").src="cards/" + cards[5];
    document.getElementById("imgHand2").src="cards/" + cards[6];
    document.getElementById("imgHand3").src="cards/" + cards[7];*/
    
//egyenleg_kimutatas
var egyenleg = 100;
document.getElementById("balance").innerHTML = "Egyenleged: ".concat(egyenleg).concat("Ft");
}
function megnezem() {
    document.getElementById("imgHand1").src = "cards/" + cards[5];
    document.getElementById("imgHand2").src = "cards/" + cards[6];
    document.getElementById("imgHand3").src = "cards/" + cards[7];
    document.getElementById("megnezem").blur();
}

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

function deal()
{
    
}

var vak_player = 0;



//bevitel
var input = document.getElementById("bevitel")
var emeles_erteke;
function emeles_lekeres() {
    emeles_erteke = document.getElementById("bevitel").value;
    console.log(emeles_erteke);
    document.getElementById("bevitel").value = "Mennyivel emelsz?";
    document.getElementById("emelek").blur();
}
function megadom() {
    document.getElementById("megadom").blur();
}
function uzenet_kuldes() {
    document.getElementById("kuldes").blur();
}
