
const API_URL = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api';
const PHOTOS_URL = 'https://cruth.phpnet.org/epfc/caviste/public/pics/';
let idVin = "";

// CHARGEMENT INITIAL DES VINS

fetch(API_URL + '/wines')
    .then(response => response.json())
    .then(data => {
        const ULWineList = document.querySelector('#wineList');
        ULWineList.innerHTML = '';

        // LISTE DES VINS
        data.forEach(wine => {
            let LI = document.createElement('li');
            LI.innerHTML = wine.name;
            LI.classList.add('list-group-item');
            LI.dataset.wineId = wine.id;

            LI.addEventListener('click', function () {
                idVin = wine.id;
                affichage(wine);
            });

            ULWineList.appendChild(LI);
        });


        //permet de rechercher un vin dans la liste
        let btsearch = document.querySelector("#btSearch");
        btsearch.addEventListener('click', function () {
            ULWineList.innerHTML = '';

            let searchval = document.querySelector("#keyword").value.trim().toLowerCase();

            data.forEach(wine => {
                if (searchval !== "" && wine.name.toLowerCase().includes(searchval)) {

                    let LI = document.createElement('li');
                    LI.innerHTML = wine.name;
                    LI.classList.add('list-group-item');
                    LI.dataset.wineId = wine.id;

                    LI.addEventListener('click', function () {
                        idVin = wine.id;
                        affichage(wine);
                    });

                    ULWineList.appendChild(LI);
                    affichage(wine);
                }
            });
        });

    });



// FONCTION PRINCIPALE D’AFFICHAGE DES DETAILS DU VIN

function affichage(wine) {

    // Photo
    const photo = document.querySelector('#photo');
    photo.src = PHOTOS_URL + wine.picture;

    // ID + Nom
    let badge = document.querySelector("#details h2 span.badge");
    badge.innerHTML = wine.id;

    let h2 = document.querySelector("#details h2");
    h2.innerHTML = "";
    h2.appendChild(badge);
    h2.appendChild(document.createTextNode(" " + wine.name));

    // Grape
    let grape = document.querySelector("#details #grape");
    grape.innerHTML = wine.grapes;

    // Country
    let country = document.querySelector("#details #country");
    country.innerHTML = wine.country;

    // Region
    let region = document.querySelector("#details #region");
    region.innerHTML = wine.region;

    // Year
    let year = document.querySelector("#details #year");
    year.innerHTML = wine.year;

    // Capacity
    let capacity = document.querySelector("#details #capacity");
    capacity.innerHTML = wine.capacity;

    // Color
    let color = document.querySelector("#details #color");
    color.innerHTML = wine.color;

    // Price
    let price = document.querySelector("#details #price");
    price.innerHTML = wine.price;
    Chargerdescription(wine.id);
}



// CHARGER LA DESCRIPTION

function Chargerdescription(wineID) {
    fetch(API_URL + '/wines/' + wineID)
        .then(res => res.json())
        .then(data => {
            const infos = document.querySelector("#infos");
            infos.innerHTML = data[0].description;
        });
}

// CHARGER LES COMMENTAIRES

function chargercomments(wineID) {
    fetch(API_URL + '/wines/' + wineID + '/comments')
        .then(response => response.json())
        .then(data => {
            let CommentContent = data.map(c => c.content).join("<br><br>");
            document.querySelector("#infos").innerHTML = CommentContent;
        });
}


//permet de charger la description quand on clic dessus
document.querySelector("#linkDescriptions").addEventListener('click', () => {
    if (idVin) Chargerdescription(idVin);
});

//permet de charger les commentaire  quand on clic dessus
document.querySelector("#linkCommentaires").addEventListener('click', () => {
    if (idVin) chargercomments(idVin);
});
