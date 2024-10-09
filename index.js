const pokemonConteiner = document.querySelector('#pokeCont');
const pokemonCount = 150;
const colors = {
    fire: '#ff4500',
    grass: '#228b22',
    electric: '#ffbf00',
    water: '#005eff',
    ground: '#b8860b',
    rock: '#a0a0a0',
    fairy: '#fceaff',
    poison: '#b34db2',
    bug: '#556b2f',
    dragon: '#97b3e6',
    psychic: '#ff7fff',
    flying: '#afeeee',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};
const mainTypes = Object.keys(colors);

// metodos

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i); // Chama a função para cada Pokémon
    }
};

const getPokemons = async (pokemon) => {
    const responsi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await responsi.json();
    createPokemonCard(data);
};

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const pokeType = poke.types.map(type => type.type.name);
    const id = poke.id.toString().padStart(3, '0');
    const type = mainTypes.find(type => pokeType.indexOf(type) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="imagem-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></
        </div>
    `;

    card.innerHTML = pokemonInnerHTML;
    pokemonConteiner.appendChild(card);
};

fetchPokemons();
