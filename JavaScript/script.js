let limitofPokemons = 24;
let loadedPokemons = 0;

let pokemonNamesJSON;
let pokemonNames;
let singlePokemonsDataJSON; // Main Api JSon where all names are and results


let singlePokemonArray = []; // All abalities for one Pokemon
let singlePokemonType; // The type of Single Pokemon, like grass, poision!

let pokemonContainerRef = document.getElementById('pokemonContainer');

async function init() {
  await renderPokemonNames();
  await renderPokemonsDialog();
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
   singlePokemonArray.push(singlePokemon);

   singlePokemonType = singlePokemon.types[0].type.name;
   pokemonContainerRef.innerHTML += getHTMLpokemonsMainContent();
  }
  loadedPokemons = limitofPokemons;
  //For me to watch JSON Infos
  console.log(await pokemonNamesJSON);
  console.log(await singlePokemon);
  //
}

function renderPokemonsDialog() {
  for (let i = 0; i < singlePokemonArray.length; i++) {
    console.log(singlePokemonArray[i].id);
  }
}


function getHTMLDialog(i) {
  return `
  <div class="dialog-container">

    <div class="dialog-header">
      <span>Pokemon Id: ${singlePokemonArray[i].id}</span>
      <button class="dialog-close-BTN" onclick="closeDialog()">Close</button>

      <button class="dialog-prev" onclick="showPrev(${i})">←</button>
        <button class="dialog-next" onclick="showNext(${i})">→</button>

    </div>

      <div class="dialog-hero">
        <p class="dialog-pokemon-name">
            ${singlePokemonArray[i].name}
        </p>
        <img class="dialog-img"
            src="${singlePokemonArray[i].sprites.other['official-artwork'].front_default}">
          <span class="dialog-type">
            ${singlePokemonArray[i].types[0].type.name}
          </span>
      </div>
      <div class ="main-infos">
        <p>Height : 0.${singlePokemonArray[i].height} m </p>
        <p>Weight : ${singlePokemonArray[i].weight} kg</p>
        <p>Base experience : ${singlePokemonArray[i].base_experience}</p>
        <p>Abilities : ${singlePokemonArray[i].abilities[0].ability.name}</p>
      </div>
  </div>`;
}

function showDialog(i) {
  let dialogRef = document.getElementById("dialogContainer");
  openDialog(i);
  dialogRef.showModal();
}

function openDialog(i) {
  let dialogRef = document.getElementById('dialogContainer');
  dialogRef.innerHTML = getHTMLDialog(i);
}

function closeDialog(){
  let dialogRef = document.getElementById("dialogContainer");
  dialogRef.close();
}

function showNext(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= singlePokemonArray.length) {
    nextIndex = 0;
  }
  openDialog(nextIndex);
}

function showPrev(currentIndex) {
  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    prevIndex = singlePokemonArray.length - 1;
  }
  openDialog(prevIndex);
}

async function loadMorePokemons() {
  limitofPokemons += 16;
  await renderPokemonNames();
}