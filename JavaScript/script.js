let limitofPokemons = 28;
let loadedPokemons = 0;

let pokemonNamesJSON;
let pokemonNames;
let singlePokemonsDataJSON; // Main Api JSon where all names are and results

let singlePokemonArray = []; // All abalities for one Pokemon
let singlePokemonType; // The type of Single Pokemon, like grass, poision!

let pokemonContainerRef = document.getElementById("pokemonContainer");

async function init() {
  await renderPokemonNames();
  await renderPokemonsDialog();
}

async function fetchPokemonNames(indexOfName) {
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limitofPokemons}`
    );
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
  showLoader();
  for (let i = loadedPokemons; i < limitofPokemons; i++) {
    pokemonNames = await fetchPokemonNames(i);
    singlePokemon = await fetchSinglePokemonsData(i + 1);
    singlePokemonArray.push(singlePokemon);

    singlePokemonType = singlePokemon.types[0].type.name;
    pokemonContainerRef.innerHTML += getHTMLpokemonsMainContent();
  }
  loadedPokemons = limitofPokemons;
  hideLoader();
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

function showDialog(i) {
  let dialogRef = document.getElementById("dialogContainer");
  openDialog(i);
  dialogRef.showModal();

  dialogRef.onclick = function (outside) {
    if (outside.target === dialogRef) {
      closeDialog();
    }
  };
}

function openDialog(i) {
  let dialogRef = document.getElementById("dialogContainer");
  dialogRef.innerHTML = getHTMLDialog(i);
}

function closeDialog() {
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
  showLoader();
  limitofPokemons += 14;
  await renderPokemonNames();
  hideLoader();
}

function showLoader() {
  document.getElementById("fullscreenLoader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("fullscreenLoader").style.display = "none";
}
