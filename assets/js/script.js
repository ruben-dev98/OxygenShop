/*************  MENU  ******************/
let iconMenu = document.getElementsByClassName('header__icon-menu')[0];
let iconMenuX = document.getElementsByClassName('header__icon-x-menu')[0];
let list = document.getElementsByClassName('nav__list')[0];

/*************  SCROLLBAR  ******************/

let scrollBar = document.getElementsByClassName('scroll')[0];

/*************  TO_TOP  ******************/

let toTop = document.getElementsByClassName('to__top')[0];

/***************  FORM  ******************/

let btnSub = document.getElementsByClassName('contact__form-submit')[0];
let userName = document.getElementById("user");
let userEmail = document.getElementById("user-email");
let legal = document.getElementById("legal");

/***************  MODAL  ******************/

let modal = document.getElementsByClassName('modal')[0];
let btnModal = document.getElementsByClassName('modal__btn')[0];

/*************  PRICES  ******************/
const basicPrice = 0;
const profPrice = 25;
const premPrice = 60;
let coinValues = {
    "eur": 0,
    "usd": 0,
    "gbp": 0
}

let priceTitles = document.getElementsByClassName('prices__plan-title');
let basic = document.getElementsByClassName('prices__plan-price--red')[0];
let prof = document.getElementsByClassName('prices__plan-price--blue')[0];
let prem = document.getElementsByClassName('prices__plan-price--green')[0];
let listMon = document.getElementsByClassName('pricing__list')[0];

/*************  SLIDER  ******************/

const classItem = 'slider__item';
const classItemActive = 'slider__item--active';

const classCountItem = 'slider__count-item';
const classCountItemActive = 'slider__count-item--active';

let items = document.getElementsByClassName('slider__item');
let countItems = document.getElementsByClassName('slider__count-item');
let sliderCount = document.getElementsByClassName('slider__count')[0];
let prev = document.getElementsByClassName('slider__button-prev')[0];
let next = document.getElementsByClassName('slider__button-next')[0];

/************************************************************/

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

/**
* Limpiar inputs y check del formulario
**/

function clear() {
    userName.value = "";
    userEmail.value = "";
    legal.checked = false;
}

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
    .then((response) => response.json())
    .then(async (json) => {
        let js = await json;
        coinValues = {
            "eur": js.eur.eur,
            "usd": js.eur.usd,
            "gbp": js.eur.gbp
        };
        setDefaultPrice(listMon.value);
    });
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

/**
 * 
 * Dependiendo del array de elementos que compartan una clase (arr) añadirle al elemento con el indice (index) el atributo class con la clase (className)
 * 
 */

function setItemActive(arr, index, className) {
    arr.item(index).setAttribute('class', className);
}

/**
 * 
 * Dependiendo de la clase por la que queramos buscar un elemento (classNameActive) dejarle una clase (className)
 * 
 */

function delItemActive(classNameActive, className) {
    (document.getElementsByClassName(classNameActive)[0]).setAttribute('class', className);  
}

/**
 * 
 * Recoger el indice del elemento ubicado en el array (arr) que tenga la clase (className) o que sea el elemento (className)
 */

function getIndex(arr, className) {
    let index = 0;
    for(let i = 0; i < arr.length; i++) {
        if(typeof className == 'string') {
            if(arr.item(i) == (document.getElementsByClassName(className)[0])) {
                index = i;
                break;
            }
        } else {
            if(arr.item(i) == className) {
                index = i;
                break;
            }
        }
    }

    return index;
}

/**
* Pintar datos del formulario
*/

function paintData(nom, email) {
    console.log('Hola, ' + nom);
    console.log('con email, ' + email);
}

/*************  MENU  ******************/

iconMenu.addEventListener('click', e => {
    list.setAttribute('style', 'display: block');
    e.target.setAttribute('style', 'display: none');
    iconMenuX.setAttribute('style', 'display: inline-block');
});

iconMenuX.addEventListener('click', e => {
    let list = document.getElementsByClassName('nav__list')[0];
    list.setAttribute('style', 'display: none');
    e.target.setAttribute('style', 'display: none');
    iconMenu.setAttribute('style', 'display: inline-block');
});

/*************  SCROLLBAR  ******************/

window.addEventListener('scroll', e => {
    let width = window.scrollY*100/window.document.body.scrollHeight;
    if((window.document.body.scrollHeight) - window.scrollY  <= window.innerHeight) {
        width = 100;
    }
    
    scrollBar.setAttribute('style', `width: ${width}%; display: block;`);
    if(width >= 25) {
        visibleModal();
        toTop.setAttribute('style', 'display: block');
    } else {
        toTop.setAttribute('style', 'display:none');
    }
});

/*************  TO_TOP  ******************/

function anim() {
    let anim = setInterval(() => {
        window.scrollTo(0 , window.scrollY - 85);
        if(window.scrollY == 0) {
            clearInterval(anim);
        }
    }, 20);
}

toTop.addEventListener('click', e => {
    let time = setTimeout(() => {
        anim();
        clearTimeout(time);
    }, 200);
});

/***************  FORM  ******************/

btnSub.addEventListener('click', () => {
    let u = new User(userName.value, userEmail.value, legal.checked);
    if(u.isValid(userName, userEmail, legal)) {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: u.saveUser(),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then(async (json) => {
            let js = await json;
            paintData(js.name, js.email);
            console.log(js);
            u.removeUser();
            clear();
        });
    }
});

/***************  MODAL  ******************/
setTimeout(() => {
    visibleModal();
}, 5000);

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
    /*fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
    .then((response) => response.json())
    .then(async (json) => {
        let mon = e.target.value;
        let js = await json;
        basic.innerHTML = calcCoin(mon, basicPrice, js);
        prof.innerHTML = calcCoin(mon, profPrice, js);
        prem.innerHTML = calcCoin(mon, premPrice, js);
    });*/
    let mon = e.target.value;
    basic.innerHTML = calcCoin(mon, basicPrice);
    prof.innerHTML = calcCoin(mon, profPrice);
    prem.innerHTML = calcCoin(mon, premPrice);
});

/*************  SLIDER  ******************/

prev.addEventListener('click', () => {
    let index = getIndex(countItems, classCountItemActive);
    if((index - 1) >= 0) {
        index -= 1;
    }

    delItemActive(classItemActive, classItem);
    delItemActive(classCountItemActive, classCountItem);
    setItemActive(items, index, `${classItem} ${classItemActive}`);
    setItemActive(countItems, index, `${classCountItem} ${classCountItemActive}`);  
});

next.addEventListener('click', () => {
    let index = getIndex(countItems, classCountItemActive);
    if((index + 1) < countItems.length) {
        index += 1;
    }

    delItemActive(classItemActive, classItem);
    delItemActive(classCountItemActive, classCountItem);
    setItemActive(items, index, `${classItem} ${classItemActive}`);
    setItemActive(countItems, index, `${classCountItem} ${classCountItemActive}`);  
});

sliderCount.addEventListener('click', (e) => {
    if (e.target != sliderCount) {
        let index = getIndex(countItems, e.target);
        
        delItemActive(classItemActive, classItem);
        delItemActive(classCountItemActive, classCountItem);
        setItemActive(items, index, `${classItem} ${classItemActive}`);
        setItemActive(countItems, index, `${classCountItem} ${classCountItemActive}`);
    }
});

/****************************************/

getCoinsData();