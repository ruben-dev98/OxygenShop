/*************  MENU  ******************/
let iconMenu = document.getElementsByClassName('header__icon-menu')[0];
let iconMenuX = document.getElementsByClassName('header__icon-x-menu')[0];
let list = document.getElementsByClassName('nav__list')[0];

/*************  SCROLLBAR  ******************/

let scrollBar = document.getElementsByClassName('scroll')[0];

/*************  TO_TOP  ******************/

let toTop = document.getElementsByClassName('to__top')[0];

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
    if(width > 50) toTop.setAttribute('style', 'display: block');
    else toTop.setAttribute('style', 'display:none');
});


/*************  SCROLLBAR  ******************/



/*************  TO_TOP  ******************/

toTop.addEventListener('click', e => {
    setTimeout(() => {
        //let sc = scrollY - 100;
        window.scrollTo(0 , 0);
    }, 200);
});

/*************  TO_TOP  ******************/

