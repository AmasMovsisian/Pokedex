let limitofPokemons = 24;
let loadedPokemons = 0;

let pokemonNamesJSON;
let pokemonNames;
let singlePokemonsDataJSON; // Main Api JSon where all names are and results


let singlePokemon; // All abalities for one Pokemon
let singlePokemonType; // The type of Single Pokemon, like grass, poision!

let pokemonContainerRef = document.getElementById('pokemonContainer');

async function init() {
  await renderPokemonNames();
}


async function fetchPokemonNames(indexOfName) {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitofPokemons}`);
    pokemonNamesJSON = await response.json();
    let pokemonNamesData = pokemonNamesJSON.results[indexOfName].name;
    return pokemonNamesData;
  } catch (error) {
    console.log(error);
  }
}

async function fetchSinglePokemonsData(id) {
  try {
   let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
   singlePokemonsDataJSON = await response.json();
   return singlePokemonsDataJSON;  
  } catch (error) {
    console.log(error);
  }

}

async function renderPokemonNames() {
  for (let i = loadedPokemons; i < limitofPokemons; i++) {
   pokemonNames = await fetchPokemonNames(i);
   singlePokemon = await fetchSinglePokemonsData(i + 1);

   singlePokemonType = singlePokemon.types[0].type.name;
   pokemonContainerRef.innerHTML += getHTMLpokemonsMainContent();
  }
  loadedPokemons = limitofPokemons;
  //For me to watch JSON Infos
  console.log(await pokemonNamesJSON);
  console.log(await singlePokemon);
  console.log(await singlePokemonType);
  //
}

async function loadMorePokemons() {
  limitofPokemons += 16;
  await renderPokemonNames();
}

// function showDialog() {
//     dialog.showModal();
// }

