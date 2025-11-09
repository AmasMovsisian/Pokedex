let limitofPokemons = 28;
let loadedPokemons = 0;
let pokemonNames;

let singlePokemonArray = [];
let singlePokemonType;

let pokemonContainerRef = document.getElementById("pokemonContainer");
let scrollBtn = document.getElementById("scrollToTopBtn");

async function init() {
  await renderPokemonNames();
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
  // console.log(await pokemonNamesJSON);
  // console.log(await singlePokemon);
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


window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};


scrollBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
