var index = 0;
var nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
var prevUrl = null;




function poky(url, prev_ou_next) {


    let config = {
        method: 'get',

    }

    if (index == 20 && prev_ou_next == 'prev') {
        // console.log("premier page");
    } else if (nextUrl == null) {
        // console.log("dernier page");

    } else {

        fetch(url, config)

        .then(function(response) {
            // console.log(response)

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



                    let debut = index + '.';
                    // pour rajouter les 1 et - au début des names
                    let nameMajuscule = data.results[i].name;

                    nameMajuscule = nameMajuscule.charAt(0).toUpperCase() + nameMajuscule.slice(1);
                    // faire le lien poky et son url

                    urlElement = data.results[i].url;

                    box += `<div class="list-item"id=${nameMajuscule}> <a onclick="javascript:namePokyurl('${data.results[i].name}');"> ${debut}${nameMajuscule}</a></div>`
                        // console.log(urlElement)


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


function namePokyurl(namePokemon) {

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