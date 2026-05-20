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
}

export { genericEvents }