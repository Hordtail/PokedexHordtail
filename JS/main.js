const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <=105; i++) {
    fetch (URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

let tipos = poke.types.map(type => `<p class="${type.type.name} type">${type.type.name}</p>`);
tipos = tipos.join('');

let pokeid = poke.id.toString();
if (pokeid.length === 1) {
    pokeid = "000" + pokeid;
}
else if (pokeid.length === 2) {
    pokeid = "00" + pokeid;
}
else if (pokeid.length === 3) {
    pokeid = "0" + pokeid;
}


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
                    <p class="pokemon-id-back">#${pokeid}</p>
                    <div class="pokemon-image">
                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-container">
                            <p class="pokemon-id">#${pokeid}</p>
                            <h2 class="pokemon-name">${poke.name}</h2>
                        </div>
                        <div class="pokemon-type">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${poke.height}M</p>
                            <p class="stat">${poke.weight}KG</p>
                        </div>
                    </div>
    `;
    listaPokemon.append(div);

}



botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <=105; i++) {
        fetch (URL + i)
            .then((response) => response.json())
            .then(data => {
                const tipos = data.types.map(type => type.type.name);

                if(botonId === "show-all") {
                    mostrarPokemon(data);
                }
                else {

                    if (tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                    }
                }
            })
    }



}))