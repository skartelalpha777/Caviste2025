
//console.log('ok');
const API_URL = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api';
const PHOTOS_URL = 'https://cruth.phpnet.org/epfc/caviste/public/pics/';

fetch(API_URL + '/wines')
    .then(response => response.json())
    .then(data => {
        const ULWineList = document.querySelector('#wineList');
        ULWineList.innerHTML = '';

        data.forEach(wine => {
            console.log(wine);

            //ULWineList.innerHTML += `<li data-wine-id="${wine.id}" class="list-group-item" onclick="....">${wine.name}</li>`   //Solution 1
            let LI = document.createElement('li');              //Solution 2
            LI.innerHTML = wine.name;
            LI.classList.add('list-group-item');
            LI.dataset.wineId = wine.id;

            LI.addEventListener('click', function (e) {
                let wineId = LI.dataset.wineId;

                let results = data.filter(function (wine) { return wineId == wine.id });

                let wine = results.length > 0 ? results[0] : undefined;

                console.log(wine);
                //Affichage de la photo du vin
                const photo = document.querySelector('#photo');
                photo.src = PHOTOS_URL + wine.picture;

                //afficher les details
                let badge = document.querySelector("#details h2 span.badge");
                badge.innerHTML = wineId;
                //permet d'ajouter les details du vin
                let h2 = document.querySelector("#details h2")
                let wineName = document.createTextNode(' ' + wine.name);
                h2.innerHTML = ' ';
                h2.appendChild(badge);
                h2.appendChild(wineName);

                //permet d'ajouter le grap du vin 
                let grap = document.querySelector("#details #grape");
                let grapecontent = document.createTextNode(wine.grapes);
                grap.innerHTML = ' ';
                grap.appendChild(grapecontent);

                //permet d'ajouter le pays du vin 
                let country = document.querySelector("#details #country");
                let countrycontent = document.createTextNode(wine.country);
                country.innerHTML = ' ';
                country.appendChild(countrycontent);

                //Permet d'ajouter la region du vin
                let region = document.querySelector("#details #region");
                let wineRegion = wine.region;
                region.innerHTML = wineRegion;
                //permet d'ajouter l'année du vin 
                let year = document.querySelector(" #details #year");
                let yearcontent = document.createTextNode(wine.year);
                year.innerHTML = "";
                year.appendChild(yearcontent);






            });



            ULWineList.appendChild(LI);
        });
    })
