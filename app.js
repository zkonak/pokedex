var index = 0;
var nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
var prevUrl = null;



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
            console.log(response)

            response.json().then(function(data) {

                // récuperer les datas sous forme de json
                console.log(data)
                let pokymon = document.querySelector('.right-container__screen')

                let box = ''
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
                    let nameMajuscule = data.results[i].name.charAt(0).toUpperCase() + data.results[i].name.slice(1);

                    box += `<div class="list-item"> ${debut}${nameMajuscule}</div>`

                }

                pokymon.innerHTML = box;

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