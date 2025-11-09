let limitofPokemons = 28;
let loadedPokemons = 0;

let pokemonNamesJSON;
let pokemonNames;
let singlePokemonsDataJSON;

let singlePokemonArray = [];
let singlePokemonType;

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
  console.log(await pokemonNamesJSON);
  console.log(await singlePokemon);
}


function renderPokemonsDialog() {
  for (let i = 0; i < singlePokemonArray.length; i++) {
    console.log(singlePokemonArray[i].id);
  }
}


function showDialog(i) {
  let dialogRef = document.getElementById("dialogContainer");
  openDialog(i);
  document.body.style.overflow = 'hidden'
  dialogRef.showModal();
  dialogRef.onclick = function (outside) {
    if (outside.target === dialogRef) {
      closeDialog();
      document.body.style.overflow = ''
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
  document.body.style.overflow = ''
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


function searchPokemon() {
  let inputRef = document.getElementById("searchBTN");
  let searchText = inputRef.value.toLowerCase().trim();
  if (searchText.length < 3) {
    showAllPokemons();
    document.getElementById('loadMoreBTN').style.display = ""
    return;
  }
  let filteredPokemons = singlePokemonArray.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchText)
  );
  renderFilteredPokemons(filteredPokemons);
}


function renderFilteredPokemons(filteredArray) {
  let loadMoreBtn = document.getElementById('loadMoreBTN');
  loadMoreBtn.style.display = "none";
  if (filteredArray.length === 0) {
    pokemonContainerRef.innerHTML = getHTMLNoPokemonFounded();
    return;
  }
  pokemonContainerRef.innerHTML = "";
  for (let i = 0; i < filteredArray.length; i++) {
    let pokemon = filteredArray[i];
    singlePokemonType = pokemon.types[0].type.name;
    singlePokemon = pokemon;
    pokemonNames = pokemon.name;
    pokemonContainerRef.innerHTML += getFilteredPokemonsHTML(pokemon);
  }
}


function showAllPokemons() {
  pokemonContainerRef.innerHTML = "";
  for (let i = 0; i < singlePokemonArray.length; i++) {
    singlePokemon = singlePokemonArray[i];
    singlePokemonType = singlePokemon.types[0].type.name;
    pokemonNames = singlePokemon.name;
    pokemonContainerRef.innerHTML += getHTMLpokemonsMainContent();
  }
}


function showDialogById(id) {
  let index = singlePokemonArray.findIndex(pokemon => pokemon.id === id);
  if (index !== -1) {
    showDialog(index);
  }
}

function showTab(tab, i, btn) {
  document.getElementById(`main-info-${i}`).style.display = tab === 'main' ? 'block' : 'none';
  document.getElementById(`extra-info-${i}`).style.display = tab === 'extra' ? 'block' : 'none';
  btn.parentNode.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}