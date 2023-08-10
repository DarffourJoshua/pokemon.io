//let proxyURL = " https://cors-anywhere.herokuapp.com"
let localAPI = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
//let localAPI = `${proxyURL}/${baseURL}`
const mainContainer = document.getElementById("mainDiv");
const PrevBtn = document.querySelector("#prev");
const NextBtn = document.querySelector("#next");
const Loader = document.querySelector(".loader");
const searchBar = document.querySelector("#searchBar");
let storeAPI = [];
let itemsPerPage = 16;
let currentPage = 1;

const showLoader = () => Loader.classList.add("dispaly");
const hideLoader = () => Loader.classList.remove("display");

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = storeAPI.filter((character) => {
        return (character.name.toLowerCase().includes(searchString))
    });
    getDataFromAPI(filteredCharacters);
});


/** 
 * Function for manipulating the data from the API
 * Also the algorithm of the pagination
 * */ 
async function getDataFromAPI(myArr) {
    //await getAPI(localAPI);
    //console.log(storeAPI);
    let divEle = "";

    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = (currentPage - 1) * itemsPerPage;
    const currentItems = myArr.slice(indexOfFirstPage, indexOfLastPage);
    const Capitalize = str => {return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`};

    await Promise.all(currentItems.map(async (item) => {
        let {name, url} = item
        let fetchedData = await(await fetch(url)).json();
        let {sprites : {front_shiny}} = fetchedData;
        divEle += `
            <div class="item-div">
                <a href= ${`details.html?=${name}`}>
                    <div class="child-item">
                        <img src=${front_shiny} />
                        <h3>${Capitalize(name)}</h3>
                    </div>
                </a>
            </div>
        `
    }))
    mainContainer.innerHTML = divEle;
}



// Function for fetching data from the Pokemon's API
async function getAPI(api) {
    try{
        showLoader();
        let res = await fetch(api);
        let data = await res.json();
        storeAPI = data.results
        hideLoader();
        getDataFromAPI(storeAPI);
    }   catch(err) {
        alert(err);
    }
}

getAPI(localAPI);

// Next page button for pagination
const prevPage = () => {
    if (currentPage > 1) {
        currentPage--;
        showLoader();
        getDataFromAPI(storeAPI);
    }
}

// Previous page button for pagination
const nextPage = () => {
    if ((currentPage * itemsPerPage) < storeAPI.length) {
        currentPage++;
        showLoader();
        getDataFromAPI(storeAPI);
    }
}

PrevBtn.addEventListener("click",prevPage, false);

NextBtn.addEventListener("click",nextPage, false);

//searchBar.addEventListener("input", searchFunction);
