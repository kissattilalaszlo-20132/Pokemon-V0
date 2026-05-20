import { APIfetch } from "./main.js";

// for pokemon submenu
export function pokemonSummary(item){
    let summary = document.createElement("div");
    summary.classList.add("summary");
    
    // sprite
    let sprite = document.createElement("img");
    sprite.src = item.sprites.other.showdown.front_default;
    summary.appendChild(sprite);

    return summary;
}

export async function pokemonDescription(item){
    // create container
    let descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("bg");

    // get description
    const species = await APIfetch(item.species.url);
    // find newest description
    let speciesDescription = species["flavor_text_entries"]
        .findLast((e) => e.language.name == "en",);

    // get version-group from newest
    const versionGroupContent = await APIfetch(speciesDescription.version.url);

    // create version-group element
    let versionGroup = document.createElement("p");
    versionGroup.classList.add("subtext");
    versionGroup.textContent = "from " + versionGroupContent.version_group.name;
    
    // add version-group to container
    descriptionContainer.appendChild(versionGroup); 
    
    // create description element
    let description = document.createElement("p");
    description.textContent = speciesDescription.flavor_text;

    // add description to container
    descriptionContainer.appendChild(description);

    return descriptionContainer;
}