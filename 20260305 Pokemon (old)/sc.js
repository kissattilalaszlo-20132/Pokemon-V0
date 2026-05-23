async function APIfetch(url){
    const response = await fetch(url);
    const data = await response.json(); 
    console.log(data)
    return data;
}

const header = document.querySelector("#header");
const title = document.querySelector("#header_title");
const main = document.querySelector("#content");

const homepage = new URL("https://pokeapi.co/api/v2/");
let currentURL = homepage;

async function gen(initial_content, menu_name){
    title.textContent = menu_name;

    for(let i = 0; i< initial_content.length; i++){
        let item = initial_content[i];

        const element = document.createElement("div");
        element.classList.add("card");
        element.classList.add(menu_name);

        const name = document.createElement("h3");
        name.textContent = item.name;
        element.appendChild(name);

        const element_info = await APIfetch(item.url);
        console.log("element info: ", element_info)
        const info_container = document.createElement("div");
        info_container.classList.add("bg");
        switch(menu_name){
            case ("ability"):
                // ability description
                var description = document.createElement("p");
                let last_en_desc;
                try { // in case of no description
                    last_en_desc = element_info["flavor_text_entries"].findLast(e => e.language.name == "en"); //find newest description
                    description.textContent = last_en_desc["flavor_text"];
                } catch {
                    description.textContent = "no description";
                }
                info_container.appendChild(description); //add to container

                // generation info
                const generation = document.createElement("p");
                generation.classList.add("subtext");
                generation.textContent = "Description from " + last_en_desc["version_group"].name;

                // aquireable by these pokemon
                const pokemon_list = document.createElement("div");
                pokemon_list.classList.add("scroll-list");
                pokemon_list.classList.add("bg");

                for(let i = 0; i < element_info.pokemon.length; i++){
                    const pkmn = element_info.pokemon[i];

                    const pkmn_item = document.createElement("div");
                    pkmn_item.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between");

                    const name = document.createElement("h4");
                    name.textContent = pkmn["pokemon"].name;
                    pkmn_item.appendChild(name);

                    const slot = document.createElement("p");
                    slot.textContent = "Slot: " + pkmn.slot;
                    pkmn_item.appendChild(slot);

                    const hidden = document.createElement("p");
                    hidden.textContent = "hidden";
                    hidden.setAttribute("style", `color: ${pkmn["is_hidden"] ? "rgba(128, 0, 0, 1)" : "rgba(0,0,0, 0.2)"}; font-weight: bold`);
                    pkmn_item.appendChild(hidden);

                    pokemon_list.appendChild(pkmn_item);
                }

                element.appendChild(generation);
                element.appendChild(info_container);
                element.appendChild(pokemon_list);

            break;
            case ("berry"):
                const firmness = document.createElement("p");                
                firmness.textContent = "Firmness: " + element_info.firmness.name.replace(/-/g, ' ');
                info_container.appendChild(firmness);

                const smoothness = document.createElement("p");
                smoothness.textContent = "Smoothness: " + element_info.smoothness;
                info_container.appendChild(smoothness);

                const size = document.createElement("p");
                size.textContent = "Berry size: " + element_info.size;
                info_container.appendChild(size);

                const gift_element_type = document.createElement("img");
                const gift_element_content = await APIfetch(element_info["natural_gift_type"].url); // gift element fetch
                gift_element_type.src = gift_element_content.sprites["generation-viii"]["sword-shield"]["name_icon"]; //gift element img;

                element.appendChild(info_container);

                const gift_element_type_title = document.createElement("h4");
                gift_element_type_title.textContent = "natural gift type: "

                const gift_element_type_power = document.createElement("p");
                gift_element_type_power.textContent = "natural gift power: " + element_info["natural_gift_power"];

                element.appendChild(gift_element_type_title);
                element.appendChild(gift_element_type);
                element.appendChild(gift_element_type_power);

                const flavor_title = document.createElement("p");
                flavor_title.classList.add("subtext");
                flavor_title.textContent = "possible flavors: ";
                element.appendChild(flavor_title);

                const flavors = document.createElement("div");
                flavors.classList.add("scroll-list");
                flavors.classList.add("bg");

                for (let i = 0; i < element_info.flavors.length; i++) {
                    const flavor = element_info.flavors[i];
                    
                    const flavor_item = document.createElement("div");
                    flavor_item.setAttribute("style", "display: flex; flex-direction: row; justify-content: center");

                    const name = document.createElement("h4");
                    name.textContent = flavor["flavor"].name;
                    flavor_item.appendChild(name);

                    flavors.appendChild(flavor_item);
                }
                element.appendChild(flavors);

            break;
            case ("berry-firmness"):
                var berries = document.createElement("div");
                berries.classList.add("scroll-list");
                berries.classList.add("bg");

                for (let i = 0; i < element_info.berries.length; i++) {
                    const berry = element_info.berries[i];
                    
                    const berry_item = document.createElement("div");
                    berry_item.setAttribute("style", "display: flex; flex-direction: row; justify-content: center");

                    const name = document.createElement("h4");
                    name.textContent = berry.name;
                    berry_item.appendChild(name);

                    berries.appendChild(berry_item);
                }
                element.appendChild(berries);
            break;
            case ("berry-flavor"):
                var berries = document.createElement("div");
                berries.classList.add("scroll-list");
                berries.classList.add("bg");

                for (let i = 0; i < element_info.berries.length; i++) {
                    const berry = element_info.berries[i];
                    
                    const berry_item = document.createElement("div");
                    berry_item.setAttribute("style", "display: flex; flex-direction: row; justify-content: center");

                    const name = document.createElement("h4");
                    name.textContent = berry["berry"].name;
                    berry_item.appendChild(name);

                    berries.appendChild(berry_item);
                }
                element.appendChild(berries);
            break;
            case ("characteristic"):
                var description = document.createElement("p");
                description.textContent = element_info.descriptions.findLast(e => e.language.name == "en")["description"];
                info_container.appendChild(description);

                const highest_stat = document.createElement("p");
                highest_stat.textContent = "highest stat: " + element_info["highest_stat"].name;
                info_container.appendChild(highest_stat);

                element.appendChild(info_container);


                const strengths_title = document.createElement("p");
                strengths_title.classList.add("subtext");
                strengths_title.textContent = "possible values: ";
                element.appendChild(strengths_title);

                const strength_list = document.createElement("div");
                strength_list.classList.add("scroll-list");
                strength_list.classList.add("bg");

                for (let i = 0; i < element_info["possible_values"].length; i++) {
                    const strength = element_info["possible_values"][i];
                    
                    const str_item = document.createElement("div");
                    str_item.setAttribute("style", "display: flex; flex-direction: row; justify-content: center");

                    const name = document.createElement("h4");
                    name.textContent = strength;
                    str_item.appendChild(name);

                    strength_list.appendChild(str_item);
                }
                element.appendChild(strength_list);
            break;
        }
         
        main.appendChild(element);
    }
}

function addClickEvent(parent, pageContent, key, parentDiv){
    parent.addEventListener("click", async () => {
        const localKey = key;
        currentURL = pageContent;
    
        let content = await APIfetch(pageContent);
        content = await APIfetch(pageContent + `?limit=${content.count}`);
    
        parentDiv.innerHTML = "";
        await gen(content.results, localKey);
    });
}

window.addEventListener("load", async () => {
    let content = await APIfetch(homepage);

    for(var key in content){
        let value = content[key];
        console.log(value);

        const option = document.createElement("a");
        option.classList.add("option");
        
        option.textContent = key;
        addClickEvent(option, value, key, main);
        // option.addEventListener("click", async () => {
        //     const localKey = key;
        //     currentURL = value;

        //     let content = await APIfetch(value);
        //     content = await APIfetch(value + `?limit=${content.count}`);

        //     main.innerHTML = "";

        //     await gen(content.results, localKey);
        // });

        main.appendChild(option);
    }
})