
const pokeApi = {}; /* OBJ que representará a pokeapi */

function convertoPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon(pokeDetail.name, pokeDetail.id, pokeDetail.types, 
                    pokeDetail.sprites.other.dream_world.front_default); 

    return pokemon;
}

pokeApi.getPokemonsDetails = (pokemon) => { 
    return fetch(pokemon.url)
            .then(response => response.json())
            .then(convertoPokeApiDetailToPokemon)
} 



pokeApi.getPokemons = (offset = 0, limit = 10) => { 

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` 
    
    return fetch(url) 
        .then(response =>response.json()) 
        .then((jsnoBody) => jsnoBody.results)
        .then((pkms) => pkms.map(pokeApi.getPokemonsDetails)) 
        .then((detailRequests) => Promise.all(detailRequests))
        .then(pokemonsDetails => pokemonsDetails)
        .catch((error) => console.error(error))
}
