let url = `https://pokeapi.co/api/v2/pokemon/pikachu`;



async function getPokemon() {
 try {
    let response = await fetch(url);
    console.log(response.ok);
    let data = await response.json();
  
    console.log(data);
 } catch (error) {
    console.log(response);
 }
}

console.log("start");
getPokemon();
console.log("end");
