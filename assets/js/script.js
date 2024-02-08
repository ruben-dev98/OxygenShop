/*************  MENU  ******************/
let iconMenu = document.querySelector('.header__icon-menu');
let iconMenuX = document.querySelector('.header__icon-x-menu');
let list = document.querySelector('.nav__list');

/*************  SCROLLBAR  ******************/

let scrollBar = document.querySelector('.scroll');

/*************  TO_TOP  ******************/

let toTop = document.querySelector('.to__top');

/***************  FORM  ******************/

let btnSub = document.querySelector('.contact__form-submit');
let userName = document.querySelector("#user");
let userEmail = document.querySelector("#user-email");
let legal = document.querySelector("#legal");

/***************  MODAL  ******************/

let modal = document.querySelector('.modal');
let userModal = document.querySelector('#modal-user');
let emailModal = document.querySelector('#modal-email');
let btnSubModal = document.querySelector('.modal__form-submit');
let btnModal = document.querySelector('.modal__btn');

/*************  PRICES  ******************/
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

/*************  SLIDER  ******************/

const classItem = 'slider__item';
const classItemActive = 'slider__item--active';

const classCountItem = 'slider__count-item';
const classCountItemActive = 'slider__count-item--active';

const classPrev = '.slider__button-prev';
const classNext = '.slider__button-next';

/************************************************************/

/*************************** FUNCTIONS MODAL *****************************************/

/**
 * 
 * Recoger una variable de localStorage por un nombre (item) 
 */

function isLocal(item) {
    if(!localStorage.getItem(item)) {
        return false;
    }
    return true;
}

/**
 * 
 * Guardar una variable en localStorage con un nombre (item) 
 */

function setLocal(item) {
    if(!localStorage.getItem(item)) {
        localStorage.setItem(item, true);
    }
}

/**
 * Hacer visible el dialog
 */

function visibleModal() {
    if(!isLocal('modal')) {
        modal.showModal();
    }
}

/*************************** FUNCTIONS FORM *****************************************/

/**
* Limpiar inputs y check del formulario
**/

function clear() {
    userModal.value = "";
    emailModal.value = "";

    userName.value = "";
    userEmail.value = "";
    legal.checked = false;
}

/*************************** FUNCTIONS PRICE *****************************************/

/**
 * 
 * Precio por defecto que tendran los componentes pricing
 */

function setDefaultPrice(mon) {
    basic.innerHTML = calcCoin(mon, basicPrice);
    prof.innerHTML = calcCoin(mon, profPrice);
    prem.innerHTML = calcCoin(mon, premPrice);
}

/**
 * Recoger los valores del cambio de monedas para realizar los calculos en los precios
 */

function getCoinsData() {
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
    .then((response) =>  {
        if(response.status === 200) {
            return response.json();
        } else if (response.status === 400) {
            console.log('Data Not Found');
        } else if(response.status === 500) {
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

/**
 * 
 * Calcular el nuevo precio dependiendo de la moneda de cambio (mon) y el precio anterior (pre)
 * Devolviendo una cadena de texto con el símbolo que le corresponda a la moneda
 */

function calcCoin(mon, price) {
    let symbol = '';
    let change = 0;
    if(mon == 'eur') {
        symbol = '€';
        change = coinValues.eur;
    } else if(mon == 'gbp') {
        symbol = '£';
        change = coinValues.gbp;
    } else {
        symbol = '$';
        change = coinValues.usd;
    }
    
    return `${symbol}${Number.parseFloat(change*price).toFixed(0)}`;
}

/*************  MENU  ******************/

function listDisplay(display, e, icon) {
    list.setAttribute('style', `display: ${display}`);
    e.target.setAttribute('style', 'display: none');
    icon.setAttribute('style', 'display: inline-block');
}

iconMenu.addEventListener('click', e => {
    listDisplay('block', e,iconMenuX);
});

iconMenuX.addEventListener('click', e => {
    listDisplay('none', e, iconMenu);
});

/*************  SCROLLBAR  ******************/


window.addEventListener('scroll', e => {
    let widthMax = (window.document.body.scrollHeight) - window.innerHeight;
    let width = window.scrollY*100/widthMax;
    scrollBar.setAttribute('style', `width: ${width}%; display: block;`);
    
    if(width >= 25) {
        visibleModal();
        toTop.setAttribute('style', 'display: block');
    } else {
        toTop.setAttribute('style', 'display:none');
    }
});

/*************  TO_TOP  ******************/

toTop.addEventListener('click', () => {
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 200);
});

/***************  FORM  ******************/

btnSub.addEventListener('click', async() => {
    let u = new User(userName.value, userEmail.value, legal.checked);
    if(u.isValid(userName, userEmail, legal)) {

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: u.toJson(),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response) => {
            if(response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                console.log('Data Not Found');
            } else if(response.status === 500) {
                console.log('Error On Server')
            }
        }).then((json) => {
            console.log(json);
            clear();
        }).catch((error) => console.log(error));
    }
});

/***************  MODAL  ******************/

let modalTime = setTimeout(visibleModal, 5000);

if(isLocal('modal')) {
    clear(modalTime);
}

btnSubModal.addEventListener('click', async() => {
    let u = new User(userModal.value, emailModal.value, true);
    if(u.isValid(userModal, emailModal, undefined)) {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: u.toJson(),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response) => {
            if(response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                console.log('Data Not Found');
            } else if(response.status === 500) {
                console.log('Error On Server')
            }
        }).then((json) => {
            console.log(json);
            clear();
        }).catch((error) => console.log(error));
    }
});

btnModal.addEventListener('click', () => {
    modal.close();
    setLocal('modal');
});

modal.addEventListener('keydown', (e) => {
    if(e.keyCode == 27) {
        modal.close();
        setLocal('modal');
    }
});

window.addEventListener('click', (e) => {
    if(e.target == modal) {
        modal.close();
        setLocal('modal');
    }
    
});

/**************  PRICES  *******************/

listMon.addEventListener('change', (e) => {
    let mon = e.target.value;
    basic.innerHTML = calcCoin(mon, basicPrice);
    prof.innerHTML = calcCoin(mon, profPrice);
    prem.innerHTML = calcCoin(mon, premPrice);
});

/*************  SLIDER  ******************/

let slider = new Slider(classItem, classCountItem, classItemActive, classCountItemActive, classPrev, classNext);

slider.automatic();
slider.prev();
slider.next();
slider.target();

getCoinsData();