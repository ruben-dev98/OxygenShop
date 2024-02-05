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

/************************************************************/

function visibleModal() {
    if(!localStorage.getItem('modal')) {
        modal.showModal();
    }
}

function clear() {
    userName.value = "";
    userEmail.value = "";
    legal.checked = false;
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
        toTop.setAttribute('style', 'display: block');
    } else {
        toTop.setAttribute('style', 'display:none');
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