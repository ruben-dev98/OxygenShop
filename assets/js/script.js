/*************  MENU  ******************/
let iconMenu = document.getElementsByClassName('header__icon-menu')[0];
let iconMenuX = document.getElementsByClassName('header__icon-x-menu')[0];
let list = document.getElementsByClassName('nav__list')[0];

/*************  SCROLLBAR  ******************/

let scrollBar = document.getElementsByClassName('scroll')[0];

/*************  TO_TOP  ******************/

let toTop = document.getElementsByClassName('to__top')[0];

/***************  FORM  ******************/

let btnSub = document.getElementsByClassName('btn__submit')[0];
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

let priceTitles = document.getElementsByClassName('prices__plan-title');
let basic = document.getElementsByClassName('prices__plan-price--red')[0];
let prof = document.getElementsByClassName('prices__plan-price--blue')[0];
let prem = document.getElementsByClassName('prices__plan-price--green')[0];
let listMon = document.getElementsByClassName('pricing__list')[0];

/*************  SLIDER  ******************/

let items = document.getElementsByClassName('slider__item');
let countItems = document.getElementsByClassName('slider__count-item');
let sliderCount = document.getElementsByClassName('slider__count')[0];
let prev = document.getElementsByClassName('slider__button-prev')[0];
let next = document.getElementsByClassName('slider__button-next')[0];

/************************************************************/

function isLocal(item) {
    if(!localStorage.getItem(item)) {
        return false;
    }
    return true;
}

function setLocal(item) {
    if(!localStorage.getItem(item)) {
        localStorage.setItem(item, true);
    }
}

function visibleModal() {
    if(!isLocal('modal')) {
        modal.showModal();
    }
}

function clear() {
    userName.value = "";
    userEmail.value = "";
    legal.checked = false;
}

function calcCoin(mon, price, json) {
    let symbol = '';
    let change = 0;
    if(mon == 'eur') {
        symbol = '€';
        change = json.eur.eur;
    } else if(mon == 'gbp') {
        symbol = '£';
        change = json.eur.gbp;
    } else {
        symbol = '$';
        change = json.eur.usd;
    }
    
    return `${symbol}${Number.parseFloat(change*price).toFixed(0)}`;
}

function setItemActive(index) {
    items.item(index).setAttribute('class', 'slider__item slider__item--active');
    countItems.item(index).setAttribute('class', 'slider__count-item slider__count-item--active');
}

function delItemActive() {
    (document.getElementsByClassName('slider__item--active')[0]).setAttribute('class', 'slider__item');
    (document.getElementsByClassName('slider__count-item--active')[0]).setAttribute('class', 'slider__count-item');    
}

function getIndex(array, className) {
    let index = 0;
    for(let i = 0; i < array.length; i++) {
        if(typeof className == 'string') {
            if(array.item(i) == (document.getElementsByClassName(className)[0])) {
                index = i;
                break;
            }
        } else {
            if(array.item(i) == className) {
                index = i;
                break;
            }
        }
    }

    return index;
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
    /*3336*/
    //console.log(e.target.body)
    //console.log(document.body);
    let width = window.scrollY*100/e.target.body.scrollHeight;
    scrollBar.setAttribute('style', 'width: ' + width + '%; display: block;');
    if(width >= 25) {
        visibleModal();
        //toTop.setAttribute('style', 'display: block');
    } else {
        //toTop.setAttribute('style', 'display:none');
    }
});

/*************  TO_TOP  ******************/

toTop.addEventListener('click', e => {
    setTimeout(() => {
        //let sc = scrollY - 100;
        window.scrollTo(0 , 0);
    }, 200);
});

/***************  FORM  ******************/

btnSub.addEventListener('click', () => {
    let u = new User(userName.value, userEmail.value, legal.checked);
    userName.removeAttribute('style');
    if(u.isValid(userName, userEmail, legal)) {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: u.saveUser(),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            u.removeUser();
        });
        clear();
    }
});

// Popup Modal aparece al 25% de la página o después de 5seg
// 3 formas de quitarla tecla ESC, click fuera de modal y boton X en modal
// LocalStorage para que no aparezca de nuevo

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
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
    .then((response) => response.json())
    .then(async (json) => {
        let mon = e.target.value;
        let js = await json;
        basic.innerHTML = calcCoin(mon, basicPrice, js);
        prof.innerHTML = calcCoin(mon, profPrice, js);
        prem.innerHTML = calcCoin(mon, premPrice, js);
    } 
    
    
    );
});

/*************  SLIDER  ******************/

prev.addEventListener('click', () => {
    let index = getIndex(countItems, 'slider__count-item--active');
    if((index - 1) >= 0) {
        index -= 1;
    }
    delItemActive();
    setItemActive(index);
});

next.addEventListener('click', () => {
    let index = getIndex(countItems, 'slider__count-item--active');
    if((index + 1) < countItems.length) {
        index += 1;
    }
    delItemActive();
    setItemActive(index);
});

sliderCount.addEventListener('click', (e) => {
    if (e.target != sliderCount) {
        let index = getIndex(countItems, e.target);
        delItemActive();
        setItemActive(index);    
    }
});