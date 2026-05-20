// imports, more to be added later
import { pokemonSummary, pokemonDescription } from './pokemon.js';
import { genericEvents } from './clickEvents.js'

async function APIfetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
}


const pageTitle = document.querySelector("#page_title"); // page name
const main = document.querySelector("#content"); // entries display
const arrows = document.querySelector("arrows"); // page number & arrows, hidden by default

const homepage = new URL("https://pokeapi.co/api/v2/");
let content; // init content

let next;
let prev;
let pageCounter;

function homePage() { // empty for now, info page later
    main.innerHTML = "";
    pageTitle.textContent = "Pokedex";
    main.classList.add("hidden");
    arrows.classList.add("hidden");
}

async function nextEvent(pageContent, pageNumber, pageCounter, submenuName){
    next = pageContent.next;
    
    if (next == null){
        return;
    }

    pageContent = await APIfetch(next);

    // update arrow links
    next = pageContent.next;
    prev = pageContent.previous;

    pageCounter++;
    pageNumber.textContent = "page " + pageCounter; 
    draw(pageContent, submenuName); // draw next page
}

async function prevEvent(pageContent, pageNumber, pageCounter, submenuName){
    prev = content.previous;

    if(prev == null){
        return
    }

    pageContent = await APIfetch(prev);

    // update arrow links
    next = pageContent.next;
    prev = pageContent.previous;

    pageCounter--;
    pageNumber.textContent = "page " + pageCounter;  
    draw(pageContent, submenuName); // draw previous page
}


async function draw(pageContent, submenuName) {
    let results = pageContent.results;

    main.classList.remove("hidden"); // show entry container
    main.innerHTML = "";
    
    arrows.classList.remove("hidden"); // show arrows
    arrows.innerHTML = '';

    
    // generate new nav elements
    let pageNumber = document.createElement("p");
    pageNumber.setAttribute("id", "page_number");
    pageNumber.textContent = "page " + pageCounter; 

    let prevArrow = document.createElement("arrow");
    prevArrow.setAttribute("id", "prev_arrow");
    prevArrow.textContent = "<";
    prevArrow.addEventListener("click", () => {
        prevEvent(pageContent, pageNumber, pageCounter, submenuName);
    });

    arrows.appendChild(prevArrow);
    
    arrows.appendChild(pageNumber);
    
    let nextArrow = document.createElement("arrow");
    nextArrow.setAttribute("id", "next_arrow");
    nextArrow.textContent = ">";
    nextArrow.addEventListener("click", () => {
        nextEvent(pageContent, pageNumber, pageCounter, submenuName);
    });
    
    arrows.appendChild(nextArrow);

    pageTitle.textContent = submenuName; // set page title

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
        let subElement;
        switch (submenuName) {
            case "Pokemon":
                subElement = await pokemonSummary(itemContent);
                card.appendChild(subElement);
            break;
        }

        // description
        subElement = null;
        switch (submenuName) {
            case "Pokemon":
                subElement = await pokemonDescription(itemContent);
                card.appendChild(subElement);
            break;  
        }
        main.appendChild(card);
    }
}

async function drawPkmn() {
    // initial values
    content = await APIfetch("https://pokeapi.co/api/v2/pokemon/?limit=50"); // first page

    next = content.next;
    prev = content.previous;

    pageCounter = 1; // page number reset

    draw(content, "Pokemon"); // draw first page
}

async function drawPokedex() {} // https://pokeapi.co/api/v2/pokedex/
async function drawMoves() {} // https://pokeapi.co/api/v2/move/

async function drawGenerations() {} // https://pokeapi.co/api/v2/generation/
async function drawVersions() {} // https://pokeapi.co/api/v2/version-group/
async function drawRegions() {} // https://pokeapi.co/api/v2/region/

function drawItems() {} // https://pokeapi.co/api/v2/item/

window.addEventListener("load", async () => { 
    genericEvents(content, pageCounter, "Home");
});

export {
    APIfetch, 
    draw,
    drawPkmn, 
    drawPokedex, 
    drawMoves, 
    drawGenerations, 
    drawVersions, 
    drawRegions, 
    drawItems 
};