const pokeapi = {}
let pokeDetail;


function convertApiToMyPoke(speciess) {
    const pokemonIdeal = new Pokemon()

    pokemonIdeal.numbr = pokeDetail.id
    pokemonIdeal.namee = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemonIdeal.type = type
    pokemonIdeal.types = types
    pokemonIdeal.photo = pokeDetail.sprites.other.dream_world.front_default
                         

    pokemonIdeal.height = (pokeDetail.height / 10).toFixed(1)
    pokemonIdeal.weight = (pokeDetail.weight / 10).toFixed(1)

    pokemonIdeal.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name).join(", ")

    const spcs = speciess.genera.map((genusSlot) => genusSlot.genus)
    const spc = spcs.at(7)
    pokemonIdeal.species = spc;
    pokemonIdeal.genderF = ((speciess.gender_rate / 8) * 100).toFixed(1)
    pokemonIdeal.genderM = 100 - pokemonIdeal.genderF

    pokemonIdeal.eggGroups = speciess.egg_groups.map((eggSlot) => eggSlot.name).join(", ")

    pokemonIdeal.baseStats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)

    let sum = pokemonIdeal.baseStats.reduce((a, b) => {
        return a + b;
    })

    pokemonIdeal.totalStats = sum;
    
    return pokemonIdeal
}

pokeapi.getSpecies = (jsonBd) => {
    pokeDetail = jsonBd;
    return fetch(jsonBd.species.url)
        .then(response => response.json())
        .then(convertApiToMyPoke)
}


pokeapi.getPokeDetails = (poke) => {
    return fetch(poke.url)
        .then(response => response.json())
        .then(pokeapi.getSpecies)
}



pokeapi.getPokemon = (offset = 0, limit =1) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then(response => response.json())
        .then((jsnoBody) => jsnoBody.results)
        .then((pkm) => pkm.map(pokeapi.getPokeDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokeDetails) => pokeDetails)
        
}