import { draw, drawPkmn, APIfetch } from "./main.js";

async function genericEvents(pageContent, pageCounter, submenuName){
    const header = document.querySelector(".header"); // burger menu
    function burgerMenu() {
        header.classList.toggle("hidden");
    }

    const burger = document.querySelector("#burger");
    burger.addEventListener("click", () => {
        burgerMenu();
    });
    
    const pokemon = document.querySelector("#pokemon");
    pokemon.addEventListener("click", () => {
        drawPkmn();
        burgerMenu();
    });

    const pokedex = document.querySelector("#pokedex");
    pokedex.addEventListener("click", () => {
        drawPokedex();
        burgerMenu();
    });

    const moves = document.querySelector("#moves");
    moves.addEventListener("click", () => {
        drawPokedex();
        burgerMenu();
    });

    const generations = document.querySelector("#generations");
    generations.addEventListener("click", () => {
        drawPokedex();
        burgerMenu();
    });

    const versions = document.querySelector("#versions");
    versions.addEventListener("click", () => {
        drawPokedex();
        burgerMenu();
    });

    const regions = document.querySelector("#regions");
    regions.addEventListener("click", () => {
        drawPokedex();
        burgerMenu();
    });

    const items = document.querySelector("#items");
    items.addEventListener("click", () => {
        drawPokedex();
        burgerMenu();
    });

    const nextArrow = document.querySelector("#next_arrow");
    nextArrow.addEventListener("click", async () => {
        nextEvent(pageContent, pageCounter, submenuName);
    });

    const prevArrow = document.querySelector("#prev_arrow");
    prevArrow.addEventListener("click", async () => {
        prevEvent(pageContent, pageCounter, submenuName);
    });
}

const pageNumber = document.querySelector("#page_number");
let next;
let prev;

async function nextEvent(pageContent, pageCounter, submenuName){
    next = pageContent.next;
    if(next != null){
        pageContent = await APIfetch(next);

        // update arrow links
        next = pageContent.next;
        prev = pageContent.previous;

        pageCounter++;
        pageNumber.innerHTML = "page " + pageCounter; 
        draw(pageContent, submenuName); // draw next page
    }
}

async function prevEvent(pageContent, pageCounter, submenuName){
    prev = content.previous;
    if(prev != null){
        pageContent = await APIfetch(prev);

        // update arrow links
        next = pageContent.next;
        prev = pageContent.previous;

        pageCounter--;
        pageNumber.innerHTML = "page " + pageCounter;
        draw(pageContent, submenuName); // draw previous page
    }
}

export { genericEvents, nextEvent, prevEvent }