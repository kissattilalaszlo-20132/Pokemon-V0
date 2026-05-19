// imports, more to be added later
import { pokemonSummary, pokemonDescription } from './pokemon.js';

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

// for some reason not recognized in HTML
function burgerMenu() {
    header.classList.toggle("hidden");
}

async function draw(pageContent, submenuName) {
    let results = pageContent.results;

    main.classList.remove("hidden"); // show entry container
    arrows.classList.remove("hidden"); // show arrows
    main.innerHTML = "";

    pageTitle.textContent = submenuName; // set page title

    // set next arrow click event
    let next = content.next;
    nextArrow.addEventListener("click", async () => {
        if(next != null){
            pageContent = await APIfetch(next);

            // update arrow links
            next = pageContent.next;
            prev = pageContent.previous;

            pageCounter++;
            pageNumber.innerHTML = "page " + pageCounter; 
            draw(pageContent); // draw next page
        }
    });

    // set previous arrow click event
    let prev = content.previous;
    prevArrow.addEventListener("click", async () => {
        if(prev != null){
            pageContent = await APIfetch(prev);

            // update arrow links
            next = pageContent.next;
            prev = pageContent.previous;

            pageCounter--;
            pageNumber.innerHTML = "page " + pageCounter;
            draw(pageContent); // draw previous page
        }
    });

    for (let i = 0; i < results.length; i++) {
        const item = results[i];

        const card = document.createElement("div");
        card.classList.add("card");

        let itemContent = await APIfetch(item.url);

        // name / title
        let name = document.createElement("h2");
        name.textContent = `#${itemContent.id}  ${itemContent.name}`;
        card.appendChild(name);
        // =====
        
        // other pages to call here later
        // summary / sprite
        switch (submenuName) {
            case "Pokemon":
                card.appendChild(pokemonSummary(itemContent));
            break;
        }

        // description
        switch (submenuName) {
            case "Pokemon":
                card.appendChild(pokemonDescription(itemContent));
            break;  
        }

    }
}

async function drawPkmn() {
    // initial values
    content = await APIfetch("https://pokeapi.co/api/v2/pokemon/?limit=50"); // first page
    pageCounter = 1; // page number reset
    pageNumber.innerHTML = "page " + pageCounter; // page number display reset

    draw(content, "Pokemon"); // draw first page
}

async function drawPokedex() {} // https://pokeapi.co/api/v2/pokedex/
async function drawMoves() {} // https://pokeapi.co/api/v2/move/

async function drawGenerations() {} // https://pokeapi.co/api/v2/generation/
async function drawVersions() {} // https://pokeapi.co/api/v2/version-group/
async function drawRegions() {} // https://pokeapi.co/api/v2/region/

function drawItems() {} // https://pokeapi.co/api/v2/item/

window.addEventListener("load", async () => {  });
