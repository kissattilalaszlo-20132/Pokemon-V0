async function APIfetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

const header = document.querySelector(".header"); // burger menu
const arrows = document.querySelector("arrows"); // page number & arrows, hidden by default

const main = document.querySelector("#content"); // entries display
const pageTitle = document.querySelector("#page_title");

const prevArrow = document.querySelector("#prev_arrow");
const pageNumber = document.querySelector("#page_number");
const nextArrow = document.querySelector("#next_arrow");

const homepage = new URL("https://pokeapi.co/api/v2/");
let content; // init content
let pageCounter;

function homePage() { // empty for now, info page later
    main.innerHTML = "";
    pageTitle.textContent = "Pokedex";
    main.classList.add("hidden");
    arrows.classList.add("hidden");
}

function burgerMenu() {
    header.classList.toggle("hidden");
}

// supposed to be general, needs rework [moved to own file]
// should call other functions inside, depending on page category (e.g. sprite source, entry description source, defined by input parameters)
async function draw(results) {
    main.classList.remove("hidden"); // show entry container
    arrows.classList.remove("hidden"); // show arrows
    main.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
        const item = results[i];

        const card = document.createElement("div");
        card.classList.add("card");

        let content = await APIfetch(item.url);

        // name
        let name = document.createElement("h2");
        name.textContent = `#${content.id}  ${content.name}`;
        card.appendChild(name);
        // =====

        //!!! sprite
        // pokemon only, to be moved later
        let sprite = document.createElement("img");
        sprite.src = content.sprites.other.showdown.front_default;
        card.appendChild(sprite);
        // =====

        // species description
        // pokemon only, to be changed/moved later
        let species_desc_box = document.createElement("div");
        species_desc_box.classList.add("bg");
        //get description
        let species = await APIfetch(content.species.url);
        let species_description = species["flavor_text_entries"].findLast(
            (e) => e.language.name == "en",
        );

        // get version-group
        const version_group = await APIfetch(species_description.version.url);

        let species_desc_note = document.createElement("p");
        species_desc_note.classList.add("subtext");
        species_desc_note.textContent = "from " + version_group.version_group.name;

        // add version-group
        species_desc_box.appendChild(species_desc_note);

        // add description
        let species_desc_element = document.createElement("p");
        species_desc_element.textContent = species_description.flavor_text;
        species_desc_box.appendChild(species_desc_element);

        card.appendChild(species_desc_box);
        // =====

        main.appendChild(card);
    }
}

async function drawPkmn() {
    // initial values
    content = await APIfetch("https://pokeapi.co/api/v2/pokemon/?limit=50"); // first page
    pageCounter = 1; // page number reset
    pageNumber.innerHTML = "page " + pageCounter; // page number display reset

    pageTitle.textContent = "Pokemon";

    // set next arrow click event
    let next = content.next;
    nextArrow.addEventListener("click", async () => {
        if(next != null){
            content = await APIfetch(next);

            // update arrow links
            next = content.next;
            prev = content.previous;

            pageCounter++;
            pageNumber.innerHTML = "page " + pageCounter; 
            draw(content.results); // draw next page
        }
    });

    // set previous arrow click event
    let prev = content.previous;
    prevArrow.addEventListener("click", async () => {
        if(prev != null){
            content = await APIfetch(prev);

            // update arrow links
            next = content.next;
            prev = content.previous;

            pageCounter--;
            pageNumber.innerHTML = "page " + pageCounter;
            draw(content.results); // draw previous page
        }
    });

    draw(content.results); // draw first page
}

async function drawPokedex() {} // https://pokeapi.co/api/v2/pokedex/
async function drawMoves() {} // https://pokeapi.co/api/v2/move/

async function drawGenerations() {} // https://pokeapi.co/api/v2/generation/
async function drawVersions() {} // https://pokeapi.co/api/v2/version-group/
async function drawRegions() {} // https://pokeapi.co/api/v2/region/

function drawItems() {} // https://pokeapi.co/api/v2/item/

window.addEventListener("load", async () => {  });
