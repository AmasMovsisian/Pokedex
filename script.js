function init() {
    renderAllPokemon();
}

function renderAllPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let results = data.results;

            let pokemonContainerRef = document.getElementById("pokemonContainer");
            pokemonContainerRef.innerHTML = '';

            for (let i = 0; i < results.length; i++) {
                pokemonContainerRef.innerHTML += `<p>${results[i].name}</p>`;
            }
        })
        .catch(err => console.error('Error fetching Pokémon:', err));
}
