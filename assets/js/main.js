const pokemonsOL = document.getElementById("pokemonsList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 12;
let offset = 0;
const maxRecords = 151;

function convertPokeToLi(pokemo) {
        return `
        <li class="pokemon ${pokemo.type}">
            <span class="number">#${pokemo.number} </span>
            <span class="name"> ${pokemo.namee} </span>
                        
            <div class="detail">
                <ol class="types">
                    ${pokemo.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
        
                <img src="${pokemo.photo}" 
                    alt=${pokemo.namee}>
            </div>                  
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonsArray = []) => { 
        const newHtml = pokemonsArray.map(convertPokeToLi).join('')

        pokemonsOL.innerHTML += newHtml;  

    }) 
    .catch((error) => console.log(error))
    .finally(() => console.log("Requisition finished"))

}

loadPokemonItens(offset, limit) 


loadMoreButton.addEventListener('click', () => { 
    offset += limit; 
    const amountRecordsWithNextPg = offset + limit;

    if (amountRecordsWithNextPg >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})
