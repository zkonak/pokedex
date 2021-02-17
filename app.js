var index = 0;
var nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
var prevUrl = null;
var activePokemonName = "pidgey";
var activeIndex = 1;

// function fetch(url, callback) {
//     setTimeout(() => {
//         callback(null, 'resultat');
//     }, 1000);
// }


function poky(url, prev_ou_next) {


    let config = {
        method: 'get',

    }

    if (index == 20 && prev_ou_next == 'prev') {
        console.log("premier page");
    } else if (nextUrl == null) {
        console.log("dernier page");

    } else {

        fetch(url, config)



        .then(function(response) {
            //  console.log(response)

            response.json().then(function(data) {

                // récuperer les datas sous forme de json
                // console.log(data)
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
                    box += `<div onclick="javascript:namePokyurl('${data.results[i].name}','${index}');" class="list-item" id=${index.toString()}> ${debut}${nameMajuscule}</div>`

                    //console.log(urlElement)


                }

                pokymon.innerHTML = box;

                let elementa = document.querySelectorAll('.list-item>a')
                elementa.forEach(element => {
                    element.style.color = 'white';
                    element.style.textDecoration = 'none';


                    // console.log(element)

                });





            })



        });
    }


};

poky(nextUrl, 'next')

//clique next
let next = document.querySelector('div.right-button')
next.addEventListener("click", function() {
    poky(nextUrl, 'next')
});
//clique prev
let prev = document.querySelector('div.left-button')
prev.addEventListener("click", function() {
    poky(prevUrl, 'prev')
});









function namePokyurl(namePokemon, index) {
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
    //active pokemon changement
    activePokemonName = namePokemon;
    activeIndex = index;


    divElement.classList.remove("hide");

    console.log(divElement);
    fetch("https://pokeapi.co/api/v2/pokemon/" + namePokemon)
        .then(function(response) {
            response.json()
                .then(function(data) {
                    console.log(data);
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








                })


        });





}

//  function pour nous envoyer var lurel

//bonusss
console.log(activePokemonName);

//let buttons = document.querySelectorAll('.buttons__button');
let buttonB = document.querySelector('.controllers__buttons div:nth-child(1)');
let buttonA = document.querySelector('.controllers__buttons div:nth-child(2)');

buttonA.addEventListener("click", function() {
    namePokyurl(activePokemonName);
});
//${activeIndex}

let rightElement = document.querySelector(".right");
let leftElement = document.querySelector(".left");
let topElement = document.querySelector(".top");
let bottomElement = document.querySelector(".bottom");

rightElement.addEventListener("click", function() {
    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex + 10;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    if (!divPokemon2) {

        poky(nextUrl, 'next');


        setTimeout(() => {
            activeIndex = activeIndex % 10;


            divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);

        }, 1000);

        //console.log(divPokemon2);

    }
    //console.log(divPokemon);
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");
    console.log(activeIndex);
    // console.log("activeIndex=" + activeIndex);
    //  namePokyurl(activePokemonName, activeIndex);



});
leftElement.addEventListener("click", function() {
    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex - 10;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    if (!divPokemon2) {
        poky(prevUrl, 'prev');

        activeIndex = activeIndex + 20;

        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
        console.log(divPokemon2);

    }
    //console.log(divPokemon);
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");

    // console.log("activeIndex=" + activeIndex);
    //  namePokyurl(activePokemonName, activeIndex);
    console.log(activeIndex);
    //namePokyurl(activePokemonName);


});
topElement.addEventListener("click", function() {

    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex - 1;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    if (!divPokemon2) {
        poky(prevUrl, 'prev');

        activeIndex = 20;


        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
        //console.log(divPokemon2);

    }
    //console.log(divPokemon);
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");

    //namePokyurl(activePokemonName);

});
bottomElement.addEventListener("click", function() {
    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex + 1;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    if (!divPokemon2) {
        poky(nextUrl, 'next');

        activeIndex = 1;

        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
        console.log(divPokemon2);

    }
    //console.log(divPokemon);
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");
    //namePokyurl(activePokemonName);

});