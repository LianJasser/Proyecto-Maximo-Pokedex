document.addEventListener("DOMContentLoaded", function () {
    const pokemonDetails = document.getElementById('pokemonDetails');

    // Obtener los datos del Pokémon desde localStorage
    const pokemonData = JSON.parse(localStorage.getItem('pokemonData'));

    if (pokemonData) {
        displayPokemon(pokemonData);
    } else {
        pokemonDetails.innerHTML = '<p>No se encontraron datos del Pokémon.</p>';
    }

    function displayPokemon(data) {
        const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const pokemonImage = data.sprites.front_default || 'https://via.placeholder.com/200';
        const pokemonTypes = data.types.map(type => type.type.name).join(", ");
        const pokemonHeight = (data.height / 10).toFixed(1); // En metros
        const pokemonWeight = (data.weight / 10).toFixed(1); // En kg
        const pokemonStats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join("<br>");

        pokemonDetails.innerHTML = `
            <h2>${pokemonName}</h2>
            <img src="${pokemonImage}" alt="${pokemonName}">
            <p><strong>Tipos:</strong> ${pokemonTypes}</p>
            <p><strong>Altura:</strong> ${pokemonHeight} m</p>
            <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
            <p><strong>Estadísticas:</strong><br>${pokemonStats}</p>
            <button onclick="window.location.href='index.html'">Volver al Pokédex</button>
        `;
    }
});