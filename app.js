var index = 0;
var nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
var prevUrl = null;
var activePokemoneName = "pidgey";
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
        // console.log("premier page");
    } else if (nextUrl == null) {
        // console.log("dernier page");

    } else {

        // fetch(url, config)

        // .then(function(response) {
        //     // console.log(response)

        //     response.json().then(function(data) {

        // récuperer les datas sous forme de json
        // console.log(data)

        let data = await fetchData(url)
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



            let debut = index + '.';
            // pour rajouter les 1 et - au début des names
            let nameMajuscule = data.results[i].name;

            nameMajuscule = nameMajuscule.charAt(0).toUpperCase() + nameMajuscule.slice(1);
            // faire le lien poky et son url

            urlElement = data.results[i].url;

            box += `<div class="list-item"id=${data.results[i].name}> <a onclick="javascript:namePokyurl('${data.results[i].name}','${activeIndex}');"> ${debut}${nameMajuscule}</a></div>`
                // console.log(urlElement)


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


function namePokyurl(namePokemon, active_index) {


    // box += `<div class="list-item"id=${nameMajuscule}> <a onclick="javascript:namePokyurl('${data.results[i].name}','{index}});"> ${debut}${nameMajuscule}</a></div>`
    // id=pour prendre facilement le name de chaque pokymones
    // on rajoute la variable index pour qu'elle apparait avant le name pour voir son index
    // console.log('index ' + index)

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

    activeIndex = active_index;

    activePokemoneName = namePokemon;

    pokemonDivs.forEach((pokemonDiv) => {
        pokemonDiv.classList.remove("activePokemon")
    });
    activeElement.classList.add("activePokemon");





    divElement.classList.remove("hide");

    // console.log(divElement);
    fetch("https://pokeapi.co/api/v2/pokemon/" + namePokemon)
        .then(function(response) {
            response.json()
                .then(function(data) {
                    console.log(data);
                    nom.innerHTML = data.name;
                    //pour ajouter 0 au debut
                    id.innerHTML = "#" + data.id.toString().padStart(3, '0');
                    // si y a pas trois chiffres au debut donc on doit rajouter un 0 

                    let image1 = data.sprites.back_default;
                    let image2 = data.sprites.front_default;
                    //pour recuperer les images toujours srcccccccccc
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



// bonus konamikode
let buttonA = document.querySelector('.controllers__buttons div:nth-child(2)')

let buttonB = document.querySelector('.controllers__buttons div:nth-child(1)')
console.log(buttonA);
buttonA.addEventListener("click", function() {
    namePokyurl(activePokemoneName, activeIndex);

});

// button malette

let elementLeft = document.querySelector(".left")
let elementTop = document.querySelector(".top")
let elementRight = document.querySelector(".right")
let elementBottom = document.querySelector(".bottom")
    // FONCTION POUR FAIRE BOUGER LA MALETTE

// left
async function moveLeft() {


    // namePokyurl(activePokemoneName);
    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex - 10;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //console.log(divPokemon);

    if (!divPokemon2) {
        await poky(prevUrl, 'prev')

        activeIndex = activeIndex + 20;


        // }
        // setTimeout(() => {
        //     if (!divPokemon2) {
        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);

    }

    activePokemoneName = divPokemon2.id
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");



    // }
    // , 100);

    // cette ligne pour associer la mellette avec le a cda quand je fait next avec la malette jepeux faire ok avec A

}

// right

async function moveRight() {

    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex + 10;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);

    if (!divPokemon2) {

        await poky(nextUrl, 'next')

        activeIndex = activeIndex % 10;
        if (activeIndex == 0) { activeIndex = 10; }


        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);

    }


    activePokemoneName = divPokemon2.id

    //     // !divpokemon2: car lindex est =0 quand tu fait right donc 
    //     // on a fait appel a la fonction pour appeler lle next
    //
    divPokemon2.classList.add("activePokemon");
    // add pour dire de mettre en action la class activepokemon qui est en css
    divPokemon1.classList.remove("activePokemon");

    //  poky(nextUrl, 'next')


    // , 100);


};


async function moveTop() {

    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex - 1;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //console.log(divPokemon);
    if (!divPokemon2) {
        await poky(prevUrl, 'prev')

        activeIndex = activeIndex + 20;
        // }


        // setTimeout(() => {
        //     if (!divPokemon2) {
        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    }
    activePokemoneName = divPokemon2.id;
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");



    // , 100);




};


// fonction pour  botton
async function moveButton() {

    let divPokemon1 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //divPokemon.classList.remove("activePokemon");
    divPokemon1.classList.add("activePokemon");
    activeIndex = activeIndex + 1;
    let divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);
    //console.log(divPokemon);

    if (!divPokemon2) {
        await poky(nextUrl, 'next')
        activeIndex = 1;


        // }

        // setTimeout(() => {
        //     if (!divPokemon2) {

        divPokemon2 = document.querySelector(`.right-container__screen div:nth-child(${activeIndex})`);


    }

    activePokemoneName = divPokemon2.id
    divPokemon2.classList.add("activePokemon");
    divPokemon1.classList.remove("activePokemon");


    // , 100);

}



elementTop.addEventListener("click", moveTop)
elementBottom.addEventListener("click", moveButton);
elementRight.addEventListener("click", moveRight)
elementLeft.addEventListener("click", moveLeft);

window.addEventListener("keyup", function(e) {
    if (e.keyCode == '38') {
        moveTop();
    } else if (e.keyCode == '40') {
        moveButton();
    } else if (e.keyCode == '37') {
        moveLeft();

    } else if (e.keyCode == '39') {
        moveRight();
    } else if (e.key == "A" || e.key == "a") {
        namePokyurl(activePokemoneName, activeIndex);
    }



});