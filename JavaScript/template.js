function getHTMLpokemonsMainContent() {
  return  `<div class="pokemon pokemon-bg-${singlePokemonType}">
   <p class="pokemon-names pokemon-bg-${singlePokemonType}">${pokemonNames}</p>
   <img 
      class="pokemon-images pokemon-bg-${singlePokemonType}"
      src="${singlePokemon.sprites.other['official-artwork'].front_default}">

          <span onclick="showDialog()" class="pokemon pokemon-BTN-${singlePokemonType}">
          ${singlePokemonType}
          </span>
   </div>
   `;
}

  // function getHTMLDialog() {
    
  // }
    