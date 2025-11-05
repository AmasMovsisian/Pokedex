let limitofPokemons = 24;

async function init() {
  const data = await getAllPokemonFromApi();
  renderAllPokemon(data);

  const singlePokemon = await getSinglePokemonFromApi(1);
  renderManyPokemons();
}

async function getAllPokemonFromApi() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitofPokemons}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getSinglePokemonFromApi(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderAllPokemon(data) {
  console.log("Alle Pokémon:", data);
}

async function renderManyPokemons() {
  let pokemonContainerRef = document.getElementById("pokemonContainer");
  pokemonContainerRef.innerHTML = "";

  for (let i = 1; i <= limitofPokemons; i++) {
    const pokemon = await getSinglePokemonFromApi(i);
    pokemonContainerRef.innerHTML += getHTMLforPokemon(pokemon);
  }
}

function loadMorePokemon() {
    limitofPokemons += 16;
    renderManyPokemons();
}