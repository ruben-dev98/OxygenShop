class User {
    name;
    email;
    legal;

    constructor(name, email, legal) {
        this.name = name;
        this.email = email;
        this.legal = legal;
    }

    isValid(iUser, iEmail, cLegal) {
        let regEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let regName = new RegExp(/^(([a-zA-Z0-9]){2,100})$/);
        let bool = true;
        if(this.name == "" || !regName.test(this.name)) {
            iUser.setAttribute('style', 'border: 2px solid red;');
            bool = false;
        } else {
            iUser.removeAttribute('style');
        }
        if(this.email == "" || !regEmail.test(this.email)) {
            iEmail.setAttribute('style', 'border: 2px solid red;');
            bool = false;
        } else {
            iEmail.removeAttribute('style');
        }
        if(!this.legal) {
            cLegal.setAttribute('style', 'border: 2px solid red;');
            bool = false;
        } else {
            if(cLegal !== undefined) {
                cLegal.removeAttribute('style');
            }
        }
        return bool;
    }

    toJson() {
        return `{
            "name": "${this.name}",
            "email": "${this.email}",
            "legal": ${this.legal}
        }`;
    }
}