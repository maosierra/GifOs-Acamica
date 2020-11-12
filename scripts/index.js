import { getTrendings, getGiftsByText, getGifById } from './services.js';

// On load index
let trendingsText = document.querySelector('main .main-description');
let trendingsCarousel = document.querySelector('.carrusel');

window.onload = function () {
    loadTrendings();
    // let theme = localStorage.getItem('theme');
    // if (theme != null) {
    //     console.log(theme);
    //     if (theme === 'theme-light') {
    //         changeTheme.innerText = 'Modo Nocturno';
    //         document.documentElement.className = 'theme-light';
    //         localStorage.setItem('theme', 'theme-light');
    //     } else {
    //         changeTheme.innerText = 'Modo Diurno';
    //         document.documentElement.className = 'theme-dark';
    //         localStorage.setItem('theme', 'theme-dark');
    //     }
    // }
}

async function loadTrendings() {
    let trendings = await getTrendings();
    trendingsText.innerHTML = '';
    trendingsCarousel.innerHTML = '';
    trendings.forEach((t, i) => {
        trendingsText.innerHTML += t.title +
            (i === trendings.length - 1 ? '' : ', ');
        trendingsCarousel.innerHTML += `
            <img id="${t.id}" src="${t.images.fixed_height.url}" alt="${t.title}"/>
        `;
    });
    trendingsCarousel.querySelectorAll('.carrusel img').forEach((img) => {
        img.addEventListener('click', onGifClick, false);
    });
}

// Burger section
let burgerIcon = document.getElementById("nav-bar-open");
let navOptions = document.getElementById("nav-bar-options");
burgerIcon.addEventListener("click", showHideMenu);

function showHideMenu() {
    console.log(document.documentElement.clientWidth);
    if (navOptions.style.display === 'none') {
        burgerIcon.src = './assets/close.svg';
        navOptions.style.display = 'block';
    } else {
        burgerIcon.src = './assets/burger.svg';
        navOptions.style.display = 'none';
    }
}

// Search section
let searchBar = document.getElementById('searchBar');
let searchIcon = document.querySelector('.main-search-input img');
let searchTitle = document.querySelector('.results h2');
let resultSection = document.querySelector('.results');
let resultContainer = document.querySelector('.results .results-img');
let btnShowMore = document.getElementById('btnShowMore');
let counterShowMore = 0;

searchBar.addEventListener('focusin', () => {
    toggleWhenFocusSearchBar();
    searchIcon.src = './assets/close.svg';
});

searchBar.addEventListener('focusout', () => {
    toggleWhenFocusSearchBar();
    if (searchBar.value.length <= 0) {
        searchIcon.src = './assets/icon-search.svg';
        resultSection.style.display = 'none';
    }
});

searchBar.addEventListener('keyup', async (e) => {
    if (e.key === 'Enter') {
        searchTitle.textContent = searchBar.value;
        resultSection.style.display = 'block';
        // TODO: create fetch to the GIF API suggestion

        // TODO: Search a show gif
        let gifts = await getGiftsByText(searchBar.value, 0);
        resultContainer.innerHTML = '';
        gifts.forEach((gift) => {
            resultContainer.innerHTML += `
                <img id="${gift.id}" src="${gift.images.fixed_height_small.url}" alt="${gift.title}"/>
            `;
        });
        document.querySelectorAll('.results-img img').forEach((img) => {
            img.addEventListener('click', onGifClick, false);
        });
    }
});

searchIcon.addEventListener('click', () => {
    if (searchBar.value) {
        searchBar.value = '';
        searchIcon.src = './assets/icon-search.svg';
        resultSection.style.display = 'none';
        resultContainer.innerHTML = '';
        toggleWhenFocusSearchBar();
        counterShowMore = 0;
    }
})

function toggleWhenFocusSearchBar() {
    if (!searchBar.value) {
        let queries = ['main h1', 'main img'];
        queries.forEach((q) => {
            let element = document.querySelector(q);
            element.classList.toggle('main-search-hide');
        });
    }
}

btnShowMore.addEventListener('click', async () => {
    counterShowMore += 10;
    let gifts = await getGiftsByText(searchBar.value, counterShowMore);
    gifts.forEach((gift) => {
        resultContainer.innerHTML += `
            <img id="${gift.id}" src="${gift.images.fixed_height_small.url}" alt="${gift.title}"/>
        `;
    });
    document.querySelectorAll('.results-img img').forEach((img) => {
        img.addEventListener('click', onGifClick, false);
    });

    document.getElementById(gifts[gifts.length - 1].id).onload = function () {
        document.getElementById(gifts[0].id).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// Show modal
let modal = document.getElementById('modal');
let selectedGif = document.getElementById('selectedGif');
let modalClose = document.querySelector('#modal .modal-close');
let gifTitle = document.querySelector('#modal h3');
let gifUser = document.querySelector('#modal h4');
let downloadGif = document.getElementById('downloadGif');

async function onGifClick(img) {
    console.log(img);
    let gifData = await getGifById(img.target.id);
    selectedGif.src = gifData.images.fixed_height_small.url;
    gifTitle.innerHTML = gifData.title;
    gifUser.innerHTML = gifData.username;
    downloadGif.href = gifData.images.downsized.url;
    modal.style.display = 'flex';
}

modal.addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target.id === 'modal-close') {
        modal.style.display = 'none';
    }
});

// Change theme
let changeTheme = document.getElementById('changeTheme');
let createGif = document.getElementById('createGif');

changeTheme.addEventListener('click', () => {
    // if (document.documentElement.className === 'theme-dark') {
    //     changeTheme.innerText = 'Modo Nocturno';
    //     document.documentElement.className = 'theme-light';
    //     localStorage.setItem('theme', 'theme-light');
    // } else {
    //     changeTheme.innerText = 'Modo Diurno';
    //     document.documentElement.className = 'theme-dark';
    //     localStorage.setItem('theme', 'theme-dark');
    // }
});

createGif.addEventListener('click', () => {
    console.log('createGif');

});