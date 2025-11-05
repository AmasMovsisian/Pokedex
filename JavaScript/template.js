function getHTMLforPokemon(pokemon) {
  const type = pokemon.types[0].type.name;
  return `
    <div class="pokemon pokemon-bg-${type}">
      <p class="pokemon-names pokemon-bg-${type}">${pokemon.name}</p>
      <img class="pokemon-images pokemon-bg-${type}" 
           src="${pokemon.sprites.other['official-artwork'].front_default}" 
           alt="${pokemon.name}">
    </div>
  `;
}


