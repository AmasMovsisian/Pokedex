function getHTMLpokemonsMainContent() {
  return  `
  <div class="pokemon pokemon-bg-${singlePokemonType}" onclick="showDialog(${singlePokemon.id - 1})">
    <p class="pokemon-names pokemon-bg-${singlePokemonType}">${pokemonNames}</p>
    <img 
        class="pokemon-images pokemon-bg-${singlePokemonType}"
        src="${singlePokemon.sprites.other['official-artwork'].front_default}">
        
        <span onclick="showDialog(${singlePokemon.id - 1})" 
              class="pokemon pokemon-BTN-${singlePokemonType}">
          ${singlePokemonType}
        </span>
  </div>`;
}

function getHTMLDialog(i) {
  return `
  <div class="dialog-container">

        <div class="dialog-header">
          <span><strong>Pokemon Id: ${singlePokemonArray[i].id}</strong></span>
          <button class="dialog-close-BTN" onclick="closeDialog()">Close</button>
        </div>

        <div class="dialog-sliders">
          <button class="dialog-prev" onclick="showPrev(${i})">←</button>
          <button class="dialog-next" onclick="showNext(${i})">→</button>
        </div>

        <div class="dialog-hero">
          <p class="dialog-pokemon-name">
              ${singlePokemonArray[i].name}
          </p>
          <img class="dialog-img dialog-bg-${singlePokemonArray[i].types[0].type.name}"
              src="${singlePokemonArray[i].sprites.other['official-artwork'].front_default}">
          <span class="dialog-type dialog-bg-${singlePokemonArray[i].types[0].type.name}">
              ${singlePokemonArray[i].types[0].type.name}
          </span>
        </div>

          <div class="main-infos">
            <strong>
              <p>Height : 0.${singlePokemonArray[i].height} m </p>
              <p>Weight : ${singlePokemonArray[i].weight} kg</p>
              <p>Base experience : ${singlePokemonArray[i].base_experience}</p>
              <p>Abilities : ${singlePokemonArray[i].abilities[0].ability.name}</p>
            </strong>
          </div>

  </div>`;
}