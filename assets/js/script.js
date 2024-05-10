let iconMenu = document.querySelector('.header__icon-menu');
let iconMenuX = document.querySelector('.header__icon-x-menu');
let list = document.querySelector('.nav__list');

let scrollBar = document.querySelector('.scroll');

let toTop = document.querySelector('.to__top');

let formCont = document.querySelector('.contact__form')
let userName = document.querySelector("#user");
let userEmail = document.querySelector("#user-email");
let legal = document.querySelector("#legal");

let modal = document.querySelector('.modal');
let userModal = document.querySelector('#modal-user');
let emailModal = document.querySelector('#modal-email');
let formMod = document.querySelector('.modal__form');
let btnModal = document.querySelector('.modal__btn');

const nav = document.querySelector('.nav__list');
const navItems = document.querySelectorAll('.nav__list-item');

const basicPrice = 0;
const profPrice = 25;
const premPrice = 60;
let coinValues = {
    "eur": 0,
    "usd": 0,
    "gbp": 0
}

let basic = document.querySelector('.prices__plan-price--red');
let prof = document.querySelector('.prices__plan-price--blue');
let prem = document.querySelector('.prices__plan-price--green');
let listMon = document.querySelector('.pricing__list');

const classItem = 'slider__item';
const classItemActive = 'slider__item--active';

const classCountItem = 'slider__count-item';
const classCountItemActive = 'slider__count-item--active';

const classPrev = '.slider__button-prev';
const classNext = '.slider__button-next';

function isLocal(item) {
    if (!localStorage.getItem(item)) {
        return false;
    }
    return true;
}

function setLocal(item) {
    if (!localStorage.getItem(item)) {
        localStorage.setItem(item, true);
    }
}

function visibleModal() {
    if (!isLocal('modal')) {
        modal.showModal();
    }
}

function clear() {
    userModal.value = "";
    emailModal.value = "";

    userName.value = "";
    userEmail.value = "";
    legal.checked = false;
}

function setDefaultPrice(mon) {
    basic.innerHTML = calcCoin(mon, basicPrice);
    prof.innerHTML = calcCoin(mon, profPrice);
    prem.innerHTML = calcCoin(mon, premPrice);
}

function getCoinsData() {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                console.log('Data Not Found');
            } else if (response.status === 500) {
                console.log('Error On Server')
            }
        })
        .then((json) => {
            coinValues = {
                "eur": json.eur.eur,
                "usd": json.eur.usd,
                "gbp": json.eur.gbp
            };
            setDefaultPrice(listMon.value);
        }).catch((error) => console.log(error));
}

function calcCoin(mon, price) {
    let symbol = '';
    let change = 0;
    if (mon == 'eur') {
        symbol = '€';
        change = coinValues.eur;
    } else if (mon == 'gbp') {
        symbol = '£';
        change = coinValues.gbp;
    } else {
        symbol = '$';
        change = coinValues.usd;
    }

    return `${symbol}${Number.parseFloat(change * price).toFixed(0)}`;
}

function listDisplay(display, e, icon) {
    list.setAttribute('style', `display: ${display}`);
    e.target.setAttribute('style', 'display: none');
    icon.setAttribute('style', 'display: inline-block');
}

iconMenu.addEventListener('click', e => {
    listDisplay('block', e, iconMenuX);
});

iconMenuX.addEventListener('click', e => {
    listDisplay('none', e, iconMenu);
});

window.addEventListener('scroll', e => {
    let widthMax = (window.document.body.scrollHeight) - window.innerHeight;
    let width = window.scrollY * 100 / widthMax;
    scrollBar.setAttribute('style', `width: ${width}%; display: block;`);

    if (width >= 25) {
        visibleModal();
        toTop.setAttribute('style', 'display: block');
    } else {
        toTop.setAttribute('style', 'display:none');
    }
});

toTop.addEventListener('click', () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 200);
});

nav.addEventListener('click', (event) => {
    if (event.target.className !== 'nav__list') {
        for (item of navItems) {
            if (item.className.includes('nav__list-item--active') && event.target.parentNode !== item) {
                item.classList.toggle('nav__list-item--active');
            }
        }
        event.target.parentNode.classList.toggle('nav__list-item--active');
    }

})

formCont.addEventListener('submit', async (event) => {
    event.preventDefault();
    let u = new User(userName.value, userEmail.value, legal.checked);
    if (u.isValid(userName, userEmail, legal)) {

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: u.toJson(),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                console.log('Data Not Found');
            } else if (response.status === 500) {
                console.log('Error On Server')
            }
        }).then((json) => {
            Swal.fire({
                title: 'Your data has been sent successfully',
                text: 'Thanks for your time!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
            });
            console.log(json);
            clear();
        }).catch((error) => console.log(error));
    }
});

let modalTime = setTimeout(visibleModal, 5000);

if (isLocal('modal')) {
    clear(modalTime);
}

formMod.addEventListener('submit', async (event) => {
    event.preventDefault();
    let u = new User(userModal.value, emailModal.value, true);
    if (u.isValid(userModal, emailModal, undefined)) {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: u.toJson(),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                console.log('Data Not Found');
            } else if (response.status === 500) {
                console.log('Error On Server')
            }
        }).then((json) => {
            Swal.fire({
                title: 'Your data has been sent successfully',
                text: 'Thanks for your time!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
            });
            console.log(json);
            clear();
            setLocal('modal');
            modal.close();
        }).catch((error) => console.log(error));

    }
});

btnModal.addEventListener('click', () => {
    modal.close();
    setLocal('modal');
});

modal.addEventListener('keydown', (e) => {
    if (e.keyCode == 27) {
        modal.close();
        setLocal('modal');
    }
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.close();
        setLocal('modal');
    }

});

listMon.addEventListener('change', (e) => {
    let mon = e.target.value;
    basic.innerHTML = calcCoin(mon, basicPrice);
    prof.innerHTML = calcCoin(mon, profPrice);
    prem.innerHTML = calcCoin(mon, premPrice);
});

let slider = new Slider(classItem, classCountItem, classItemActive, classCountItemActive, classPrev, classNext);

slider.automatic();
slider.prev();
slider.next();
slider.target();

getCoinsData();