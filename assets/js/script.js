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

let items = document.querySelectorAll('.slider__item');
let countItems = document.querySelectorAll('.slider__count-item');
let sliderCount = document.querySelector('.slider__count');
let prev = document.querySelector('.slider__button-prev');
let next = document.querySelector('.slider__button-next');

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


/*************************** FUNCTIONS SLIDER *****************************************/

function getItemActive(className) {
    return document.querySelector('.'+className);
}

function setClass(elem, classElem) {
    elem.setAttribute('class', classElem);
}

function setClassNextPrev(arr, classNameActive, className, action) {
    let itemActive = getItemActive(classNameActive);
    let index = 0;
    arr.forEach((e, i) => {
        if(e == itemActive) {
            index = i;
            if(action == 'next') {
                if((index + 1)  < arr.length) {
                    index += 1;
                    setClass(e, className);
                    setClass(arr[index], `${className} ${classNameActive}`);
                }
            } else if(action == 'prev') {
                if((index - 1)  >= 0) {
                    index -= 1;
                    setClass(e, className);
                    setClass(arr[index], `${className} ${classNameActive}`);
                }
            }
        }
    });
}

function setClassTarget(arr, arrItem, target, classNameActive, className, classNameActiveItem, classNameItem) {
    let itemActive = getItemActive(classNameActive);
    let itemActiveItem = getItemActive(classNameActiveItem);
    arr.forEach((e, i) => {
        if(e == target) {
            setClass(itemActive, className);
            setClass(itemActiveItem, classNameItem);
            setClass(target, `${className} ${classNameActive}`);
            setClass(arrItem[i], `${classNameItem} ${classNameActiveItem}`);
        }
    });
}




/**
* Pintar datos del formulario
*/

/*function paintData(nom, email) {
    console.log('Hola, ' + nom);
    console.log('con email, ' + email);
}*/

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
            //paintData(js.name, js.email);
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
    /*let index = getIndex(countItems, classCountItemActive);
    if((index - 1) >= 0) {
        index -= 1;
    }*/
    setClassNextPrev(countItems, classCountItemActive, classCountItem, 'prev');
    setClassNextPrev(items, classItemActive, classItem, 'prev');
    /*  
        delItemActive(classItemActive, classItem);
        delItemActive(classCountItemActive, classCountItem);
        setItemActive(items, index, `${classItem} ${classItemActive}`);
        setItemActive(countItems, index, `${classCountItem} ${classCountItemActive}`);  
    */
});

next.addEventListener('click', () => {
    /*let index = getIndex(countItems, classCountItemActive);
    if((index + 1) < countItems.length) {
        index += 1;
    }*/
    setClassNextPrev(countItems, classCountItemActive, classCountItem, 'next');
    setClassNextPrev(items, classItemActive, classItem, 'next');
    /*
        delItemActive(classItemActive, classItem);
        delItemActive(classCountItemActive, classCountItem);
        setItemActive(items, index, `${classItem} ${classItemActive}`);
        setItemActive(countItems, index, `${classCountItem} ${classCountItemActive}`);  
    */
});

sliderCount.addEventListener('click', (e) => {
    if (e.target != sliderCount) {
        //let index = getIndex(countItems, e.target);
        
        setClassTarget(countItems, items, e.target, classCountItemActive, classCountItem, classItemActive, classItem);
        /*
            delItemActive(classItemActive, classItem);
            delItemActive(classCountItemActive, classCountItem);
            setItemActive(items, index, `${classItem} ${classItemActive}`);
            setItemActive(countItems, index, `${classCountItem} ${classCountItemActive}`);
        */
    }
});

/****************************************/

getCoinsData();