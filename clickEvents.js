export async function genericEvents(pageContent){
    const burgerMenu = document.querySelector("#burger");
    burgerMenu.addEventListener("click", () => {
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

    
}

export async function nextEvent(pageContent){
    let next = pageContent.next;
    nextArrow.addEventListener("click", async () => {
        if(next != null){
            pagepageContent = await APIfetch(next);

            // update arrow links
            next = pagepageContent.next;
            prev = pagepageContent.previous;

            pageCounter++;
            pageNumber.innerHTML = "page " + pageCounter; 
            draw(pagepageContent); // draw next page
        }
    });
}

export async function pervEvent(pageContent){
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
}