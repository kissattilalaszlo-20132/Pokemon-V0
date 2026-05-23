import { APIfetch } from "./main.js";

async function pokedexSummary(itemContent) {
    let summary = document.createElement("div");
    summary.classList.add("summary");

    let pokemonCount = document.createElement("p");
    pokemonCount.textContent = itemContent.pokemon_entries.length + " pokemon";

    summary.appendChild(pokemonCount);

    return summary;
}

async function pokedexDescription(itemContent){
    let descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("bg");

    let description = document.createElement("p");
    let dexDescription = itemContent.descriptions
        .findLast((e) => e.language.name == "en").description;
    
        
    if(dexDescription == "") description.textContent = "No description found"; 
    else description.textContent = dexDescription;
    descriptionContainer.appendChild(description);
    
    return descriptionContainer;
}

export {
    pokedexSummary,
    pokedexDescription
}