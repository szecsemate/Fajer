
window.onload = function () {   
//egyenleg_kimutatas
var egyenleg = 100;
document.getElementById("balance").innerHTML = "Egyenleged: ".concat(egyenleg).concat("Ft");
}

//bevitel
var input = document.getElementById("bevitel")
var emeles_erteke;

function megadom() {
    document.getElementById("megadom").blur();
}
function uzenet_kuldes() {
    document.getElementById("chat-button").blur();
}

function emeles_lekeres() {
  if (isNaN(document.getElementById("bevitel").value) == false)
  {
      emeles_erteke = document.getElementById("bevitel").value;
  }
  else {
      alert("HIBA! Probald ujra!");
  }
  console.log(emeles_erteke);
  document.getElementById("bevitel").value = "Mennyivel emelsz?";
  document.getElementById("emelek").blur();

  return emeles_erteke;
}

