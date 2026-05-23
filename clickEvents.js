import { 
    draw, 
    APIfetch,
    drawPkmn,
    drawPokedex,
    drawMoves,
    drawGenerations,
    drawVersions,
    drawRegions,
    drawItems
} from "./main.js";

async function genericEvents(pageContent, pageCounter, submenuName){
    const header = document.querySelector(".header"); // burger menu
    function burgerMenu() {
        header.classList.toggle("closed");
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
        drawMoves();
        burgerMenu();
    });

    const generations = document.querySelector("#generations");
    generations.addEventListener("click", () => {
        drawGenerations();
        burgerMenu();
    });

    const versions = document.querySelector("#versions");
    versions.addEventListener("click", () => {
        drawVersions();
        burgerMenu();
    });

    const regions = document.querySelector("#regions");
    regions.addEventListener("click", () => {
        drawRegions();
        burgerMenu();
    });

    const items = document.querySelector("#items");
    items.addEventListener("click", () => {
        drawItems();
        burgerMenu();
    });
}

export { genericEvents }