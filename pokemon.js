import { APIfetch } from "./main.js";

function infoBuilder(name, value) {
    let line = document.createElement("div");
    
    let lineName = document.createElement("p");
    lineName.textContent = name + ":  ";

    let lineValue = document.createElement("p");
    lineValue.textContent = value;

    line.appendChild(lineName);
    line.appendChild(lineValue);

    return line;
}

// for pokemon submenu
export async function pokemonSummary(item){
    let summary = document.createElement("div");
    summary.classList.add("summary");
    
    // get general info 
    const species = await APIfetch(item.species.url);

    let info = document.createElement("div");
    info.classList.add("info");

    info.appendChild(infoBuilder("color", species.color.name));
    info.appendChild(infoBuilder("habitat", species.habitat.name));
    info.appendChild(infoBuilder("shape", species.shape.name));

    let genderRate = document.createElement("p");
    switch (species.gender_rate) { // ♀️ ♂️
        case 0:
            genderRate.textContent = "cannot breed";
            break;
        case 1:
            genderRate.textContent = "1♀️ : 7♂️";
            break;
        case 2:
            genderRate.textContent = "1♀️ : 3♂️";
            break;
        case 4:
            genderRate.textContent = "1♀️ : 1♂️";
            break;
        case 6:
            genderRate.textContent = "3♀️ : 1♂️";
            break;
        case 7:
            genderRate.textContent = "7♀️ : 1♂️";
            break;
        case 8:
            genderRate.textContent = "female only";
            break;
        case -1:
            genderRate.textContent = "gender unknown";
            break;
        default:
            genderRate.textContent = "not documented";
            break;
    }
    info.appendChild(genderRate);

    summary.appendChild(info);

    // sprite
    let spriteContainer = document.createElement("div");
    let sprite = document.createElement("img");
    sprite.src = item.sprites.other.showdown.front_default;
    spriteContainer.appendChild(sprite);
    summary.appendChild(spriteContainer);

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