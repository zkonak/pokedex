var index = 0;
var nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
var prevUrl = null;
var activePokemonName = "pidgey";
var activeIndex = 1;

async function fetchData(url) {

    let response = await fetch(url);
    return response.json();

}


async function poky(url, prev_ou_next) {


    let config = {
        method: 'get',

    }

    if (index == 20 && prev_ou_next == 'prev') {
        console.log("premier page");
    } else if (nextUrl == null) {
        console.log("dernier page");

    } else {

        // fetch(url, config)



        // .then(function(response) {
        //  console.log(response)

        // response.json().then(function(data) {

        // récuperer les datas sous forme de json


        let data = await fetchData(url);

        let pokymon = document.querySelector('.right-container__screen')

        let box = ''
        let urlElement = ''
        nextUrl = data.next;
        prevUrl = data.previous;

        if (prev_ou_next == 'prev') {
            index = index - 40;
        }
        for (let i = 0; i < data.results.length; i++) {

            // // pour qu'il continu de compter de 20 car on un variable var

            index++;



            let debut = index + '. ';
            // pour rajouter les 1 et - au début des names
            let nameMajuscule = data.results[i].name;

            nameMajuscule = nameMajuscule.charAt(0).toUpperCase() + nameMajuscule.slice(1);
            // faire le lien poky et son url

            urlElement = data.results[i].url;
            // <a href="javascript:namePokyurl('${data.results[i].name}');"></a>
            box += `<div onclick="javascript:namePokyurl('${data.results[i].name}','${activeIndex}');" class="list-item" id=${data.results[i].name}> ${debut}${nameMajuscule}</div>`

            //console.log(urlElement)


        }

        pokymon.innerHTML = box;

        let elementa = document.querySelectorAll('.list-item>a')
        elementa.forEach(element => {
            element.style.color = 'white';
            element.style.textDecoration = 'none';


            // console.log(element)

            //     });





            // })



        });
    }


};

poky(nextUrl, 'next');

//clique next
let next = document.querySelector('div.right-button')
next.addEventListener("click", function() {
    poky(nextUrl, 'next');
});
//clique prev
let prev = document.querySelector('div.left-button')
prev.addEventListener("click", function() {
    poky(prevUrl, 'prev')
});









function namePokyurl(namePokemon, active_index) {
    //  box += `<div onclick="javascript:namePokyurl('${data.results[i].name}','${index}');" class="list-item"id=${nameMajuscule}> ${debut}${nameMajuscule}</div>`
    console.log("index::" + index);
    let pokedex = document.querySelector('div.main-section__black')
    let elementImage1 = document.querySelector(".poke-back-image");
    let elementImage2 = document.querySelector(".poke-front-image");
    let elementHeight = document.querySelector(".poke-height");
    let elementWeight = document.querySelector(".poke-weight");
    let divElement = document.querySelector(".main-screen");
    let poketypeone = document.querySelector(".poke-type-one");
    let poketypetwo = document.querySelector(".poke-type-two");
    let nom = document.querySelector(".poke-name");
    let id = document.querySelector(".poke-id");
    let pokemonDivs = document.querySelectorAll(".list-item");
    let activeElement = document.getElementById(namePokemon);


    ///css style remove for blue clair
    pokemonDivs.forEach((pokemonDiv) => {
        pokemonDiv.classList.remove("activePokemon");
    });

    activeElement.classList.add("activePokemon");






    divElement.classList.remove("hide");


    fetch("https://pokeapi.co/api/v2/pokemon/" + namePokemon)
        .then(function(response) {
            response.json()
                .then(function(data) {
                    //console.log(data);
                    nom.innerHTML = data.name;
                    //pour ajouter 0 au debut
                    id.innerHTML = "#" + data.id.toString().padStart(3, '0');

                    let image1 = data.sprites.back_default;
                    let image2 = data.sprites.front_default;

                    elementImage1.src = image1;
                    elementImage2.src = image2;

                    elementHeight.innerHTML = data.height;
                    elementWeight.innerHTML = data.weight;
                    poketypeone.innerHTML = data.types[0].type.name;
                    if (data.types[1]) {
                        poketypetwo.innerHTML = data.types[1].type.name;
                    }
                    divElement.classList.add(data.types[0].type.name);
                    //active pokemon changement
                    activePokemonName = namePokemon;
                    activeIndex = active_index;
                    console.log("active index a change" + activeIndex);







                })


        });





}

//  function pour nous envoyer var lurel

//bonusss


//let buttons = document.querySelectorAll('.buttons__button');
let buttonB = document.querySelector('.controllers__buttons div:nth-child(1)');
let buttonA = document.querySelector('.controllers__buttons div:nth-child(2)');

buttonA.addEventListener("click", function() {
    namePokyurl(activePokemonName, activeIndex);
});
//${activeIndex}

let rightElement = document.querySelector(".right");
let leftElement = document.querySelector(".left");
let topElement = document.querySelector(".top");
let bottomElement = document.querySelector(".bottom");


async function moveRight() {


    console.log(activeIndex);
    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex + 10;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    if (!divPokemon2) {

        await poky(nextUrl, 'next');
        activeIndex = activeIndex % 10;
        if (activeIndex == 0) { activeIndex = 10; }
        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);

    }

    activePokemonName = divPokemon2.id;
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");

    //  }, 100);



}


async function moveLeft() {


    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex - 10;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    if (!divPokemon2) {
        await poky(prevUrl, 'prev');

        activeIndex = activeIndex + 20;

        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    }

    activePokemonName = divPokemon2.id;
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");









}




async function moveUp() {

    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex - 1;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    if (!divPokemon2) {
        await poky(prevUrl, 'prev');

        activeIndex = 20;
        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    }

    activePokemonName = divPokemon2.id;
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");





}



async function moveDown() {
    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex + 1;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    if (!divPokemon2) {
        await poky(nextUrl, 'next');

        activeIndex = 1;

        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    }

    activePokemonName = divPokemon2.id;
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");




}




rightElement.addEventListener("click", moveRight);
//window.addEventListener("keyright", moveRight);
leftElement.addEventListener("click", moveLeft);
//window.addEventListener("keyleft", moveLeft);
topElement.addEventListener("click", moveUp);
//
bottomElement.addEventListener("click", moveDown);
//window.addEventListener("keydown", moveDown);

window.addEventListener("keyup", function(e) {


    if (e.keyCode == '38') {
        moveUp();
    } else if (e.keyCode == '40') {
        // down arrow
        moveDown();
    } else if (e.keyCode == '37') {
        // left arrow
        moveLeft();
    } else if (e.keyCode == '39') {
        // right arrow
        moveRight();
    } else if (e.key == "A" || e.key == "a") {
        namePokyurl(activePokemonName, activeIndex);
    }


});