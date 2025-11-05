function init() {
    renderAllPokemon();
}

function renderAllPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=24')
        .then(res => res.json())
        .then(data => {
            let results = data.results;
            let pokemonContainerRef = document.getElementById("pokemonContainer");
            pokemonContainerRef.innerHTML = '';

            for (let i = 0; i < results.length; i++) {
                let pokemon = results[i];
                let url = pokemon.url;

                fetch(url)
                    .then(res => res.json())
                    .then(details => {
                        let name = details.name;
                        let image = details.sprites.front_default;
                        let typeName = details.types[0].type.name;


                        if (details.types.length > 1) {
                            typeName += ' / ' + details.types[1].type.name;
                        }

                        pokemonContainerRef.innerHTML += `
                            <div class="pokemon">
                                <h3>${name}</h3>
                                <img src="${image}" alt="${name}">
                                <p>Typ: ${typeName}</p>
                            </div>
                        `;
                    })
                    .catch(err => console.error('Fehler beim Laden der Pokémon-Details:', err));
            }
        })
        .catch(err => console.error('Fehler beim Laden der Pokémon-Liste:', err));
}
