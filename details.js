const useURL = `https://pokeapi.co/api/v2/pokemon`;
const PokemonImg = document.getElementById("pokemonImg");
const PokemonName = document.getElementById("pokemonName");
const Species = document.getElementById("species");
const BaseStat = document.getElementById("baseStat");
const Types = document.querySelector("#types");
const Weight = document.querySelector("#weight");
const Moves = document.querySelector("#moves");
 const Capitalize = str => {return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`};

async function getPokemonDetails(api) {
    let userWindow = window.location.search.slice(1).split('=')[1];
    document.title = `Pokemon - ${userWindow}`;
    let oneURL = `${api}/${userWindow}`
    
    let res = await fetch(oneURL);
    let data = await res.json();
    
    let {sprites : {front_shiny}, forms: [{name}]} = data;
    let pName = Capitalize(name);
   
    PokemonImg.src = front_shiny; //pokemon's Image
    PokemonName.textContent = pName; //pokemon's name
    Species.textContent = pName;  // pokemon's species

    //Pokemon's Base Stats
   let specs = data.stats;
   specs.forEach(element => {
        let {stat : {name}, base_stat} = element
        BaseStat.innerHTML += 
        `
            <div class="baseElement">
                <p>${name}</p>
                <span>${base_stat}</span>
            </div> 
        `
   });

   //Pokemon's types
   let pokemonTypes = data.types;
   pokemonTypes.forEach(element => {
    let {type : {name}} = element
    Types.innerHTML += `<span class="typeElement">${Capitalize(name)}</span>`
   });

   //pokemon's weight
   Weight.textContent = `${data.weight} lbs`;

   //pokemon's moves
   let pokemonMoves = data.moves;
   pokemonMoves.forEach(element => {
    let {move : {name}} = element
        Moves.innerHTML +=
        `
            <span class="movesSpan">${Capitalize(name)}</span>
        `
   })
}

getPokemonDetails(useURL);
