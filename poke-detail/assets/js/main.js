let offset = 0;
const limit = 1;
const pokemonOL = document.getElementById("pokemonsList");

const maxValue = 121;

function convertPokeToLi(traits) {
    return `
            <li class="pokemon ${traits.type}">
                <div class="upper-detail ${traits.type}">
                    <div class="skip-buttons">
                        <button class="previous" onclick="changePoke('previous')">←</button>
                        <button class="next" onclick="changePoke('next')">→</button>
                    </div>
                    <div class="name">${traits.namee}</div>
                    <div class="number">#${traits.numbr}</div>
                    <ol class="types">
                        ${traits.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>

                <div class="lower-info"> 
                    <div class="tab">
                        <button class="tablinks" onclick="openPokeTab(event, 'About')"id="defaultOpen">About</button>
                        <button class="tablinks" onclick="openPokeTab(event, 'BaseStats')">Base Stats</button>
                        
                        
                    </div>

                    <div id="About" class="tabcontent">
                        <span class="cont"><h4 class="title">Species</h4>       <h4>${traits.species}</h4></span> 
                        <span class="cont"><h4 class="title">Height</h4>        <h4>${traits.height}m</h4></span>
                        <span class="cont"><h4 class="title">Weight</h4>        <h4>${traits.weight}</h4></span>
                        <span class="cont"><h4 class="title">Abilities</h4>     <h4>${traits.abilities}</h4></span>
                        <span><h3>Breeding</h3></span>
                        <span class="cont"><h4 class="title">Gender</h4>        <h4>♂️${traits.genderM}% ♀️${traits.genderM}%</h4></span>
                        <span class="cont"><h4 class="title">Egg Groups</h4>    <h4>${traits.eggGroups}</h4></span>
                        <span class="cont"><h4 class="title">Egg Cycle </h4>    <h4>${traits.type}</h4></span>

                    </div>

                    <div id="BaseStats" class="tabcontent">
                        <span class="cont"><h4 class="title">HP</h4>            <h4>${traits.baseStats.at(0)}</h4></span>
                        <span class="cont"><h4 class="title">Attack</h4>        <h4>${traits.baseStats.at(1)}</h4></span>
                        <span class="cont"><h4 class="title">Defense</h4>       <h4>${traits.baseStats.at(2)}</h4></span>
                        <span class="cont"><h4 class="title">Sp.Atk</h4>        <h4>${traits.baseStats.at(3)}</h4></span>
                        <span class="cont"><h4 class="title">Sp.Def</h4>        <h4>${traits.baseStats.at(4)}</h4></span>
                        <span class="cont"><h4 class="title">Speed</h4>         <h4>${traits.baseStats.at(5)}</h4></span>
                        <span class="cont"><h4 class="title">Total</h4>         <h4>${traits.totalStats}</h4></span>

                    </div>

                    
                        
                </div>
                <img src="${traits.photo}" alt="${traits.namee}">
            </li>
        
    
    `


}



function loadPokemonItens(offset, limit) {
    pokeapi.getPokemon(offset, limit).then((pokemonArray = []) => { 
        const newHtml = pokemonArray.map(convertPokeToLi).join('')

        pokemonOL.innerHTML = newHtml;  

    }) 
    .catch((error) => console.log(error))
    .finally(() => console.log("Requisition finished"))

}

loadPokemonItens(offset, limit);

function changePoke(trait) {
    if(trait == "previous") {
        const previousAmount = offset - limit;
        if(previousAmount >= 0) {
            offset -= limit;
            loadPokemonItens(offset, limit);
        }
    } else if(trait == "next") {
        const nextAmount = offset + limit;
        if(nextAmount <= maxValue) {
            offset += limit;
            loadPokemonItens(offset, limit);
        }
    }

    
}


