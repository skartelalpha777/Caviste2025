//console.log("Bonjour");
const API_URL = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api';

fetch('https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines')
    .then(response => response.json())
    .then(json => {

        const ULWineList = document.querySelector('wineList');
        ULWineList.innerHTML ='';
        json.forEach(wine => {
            console.log(wine.name);
            let LI = document.createElement('li');
            LI.innerHTML = wine.name;
            LI.classList.add('list-groupep-item');
            LI.dataset.wineId = wine.id;
            LI.addEventListener('click', function (e) {

                let wineId = LI.dataset.wineId;
                let results = data.filter(wine == wine.id);
                let wine = results.length > 0 ? results[0] : undefined;
                console.log(wine);

            });

            ULWineList.appendChild(Li);

        });

    });
