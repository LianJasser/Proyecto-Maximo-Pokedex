document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const pokemonInfo = document.getElementById('pokemonInfo');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchQuery = searchInput.value.toLowerCase().trim();
        
        if (searchQuery) {
            fetchPokemon(searchQuery);
        } else {
            pokemonInfo.innerHTML = '<p>Por favor, ingresa un nombre o número.</p>';
        }
    });

    async function fetchPokemon(query) {
        const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('No se encontró ese Pokémon');
            }
            const data = await response.json();
            displayPokemon(data);
        } catch (error) {
            pokemonInfo.innerHTML = `<p>${error.message}</p>`;
        }
    }

    function displayPokemon(data) {
        const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const pokemonImage = data.sprites.front_default || 'https://via.placeholder.com/200'; // Imagen por defecto si no hay
        const pokemonTypes = data.types.map(type => type.type.name).join(", ");
        const pokemonHeight = (data.height / 10).toFixed(1); // En metros
        const pokemonWeight = (data.weight / 10).toFixed(1); // En kg
        const pokemonStats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join("<br>");

        pokemonInfo.innerHTML = `
            <h2>${pokemonName}</h2>
            <img src="${pokemonImage}" alt="${pokemonName}">
            <p><strong>Tipos:</strong> ${pokemonTypes}</p>
            <p><strong>Altura:</strong> ${pokemonHeight} m</p>
            <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
            <p><strong>Estadísticas:</strong><br>${pokemonStats}</p>
        `;
    }
});