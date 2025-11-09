function getHTMLpokemonsMainContent() {
  return  `
  <div class="pokemon pokemon-bg-${singlePokemonType}" onclick="showDialog(${singlePokemon.id - 1})">
    <p class="pokemon-names pokemon-bg-${singlePokemonType}">${pokemonNames}</p>
    <img 
        class="pokemon-images pokemon-bg-${singlePokemonType}"
        src="${singlePokemon.sprites.other['official-artwork'].front_default}">
        
        <span onclick="showDialog(${singlePokemon.id - 1})" 
              class=" pokemon-BTN-${singlePokemonType}">
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
        <p class="dialog-pokemon-name">${singlePokemonArray[i].name}</p>
        <img class="dialog-img dialog-bg-${singlePokemonArray[i].types[0].type.name}"
            src="${singlePokemonArray[i].sprites.other['official-artwork'].front_default}">
        <span class="dialog-type dialog-bg-${singlePokemonArray[i].types[0].type.name}">
            ${singlePokemonArray[i].types[0].type.name}
        </span>
      </div>

      <div class="tabs-btns">
        <button class="tab-btn-main-info active" onclick="showTab('main', ${i}, this)">Main Info</button>
        <button class="tab-btn-extra-info" onclick="showTab('extra', ${i}, this)">Extra Info</button>
      </div>

      <div class="tab-content" id="main-info-${i}" style="display:block;">
        <p>Height :<strong> 0.${singlePokemonArray[i].height} m</strong></p>
        <p>Weight :<strong> ${(singlePokemonArray[i].weight / 10).toFixed(1)} kg</strong></p>
        <p>Base experience :<strong> ${singlePokemonArray[i].base_experience}</strong></p>
        <p>Abilities :<strong> ${singlePokemonArray[i].abilities[0].ability.name}</strong></p>
      </div>

      <div class="tab-content" id="extra-info-${i}" style="display:none;">
        <p>HP:<strong> ${singlePokemonArray[i].stats[0].base_stat}</strong></p>
        <p>Attack:<strong> ${singlePokemonArray[i].stats[1].base_stat}</strong></p>
        <p>Defense:<strong> ${singlePokemonArray[i].stats[2].base_stat}</strong></p>
        <p>Special Attack:<strong> ${singlePokemonArray[i].stats[3].base_stat}</strong></p>
      </div>

  </div>`;
}


function getHTMLNoPokemonFounded() {
  return  `
        <p class="no-result-text">No Pokémon found!</p>
          `;
}


function getFilteredPokemonsHTML(pokemon) {
  return `
      <div class="pokemon pokemon-bg-${singlePokemonType}" onclick="showDialogById(${pokemon.id})">
        <p class="pokemon-names pokemon-bg-${singlePokemonType}">${pokemonNames}</p>
        <img 
            class="pokemon-images pokemon-bg-${singlePokemonType}"
            src="${pokemon.sprites.other['official-artwork'].front_default}">
            
            <span onclick="showDialogById(${pokemon.id})" 
                  class="pokemon pokemon-BTN-${singlePokemonType}">
              ${singlePokemonType}
            </span>
      </div>`;
}