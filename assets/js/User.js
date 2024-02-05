class User {
    name;
    email;
    legal;

    constructor(name, email, legal) {
        this.name = name;
        this.email = email;
        this.legal = legal;
    }

    saveUser() {
        return json = `{
            name: ${this.name},
            email: ${this.email},
            legal: ${this.legal}
        }`;
    }

    isValid() {
        if(this.name/*Regex*/);
        if(this.email/*Regex*/);
        if(this.legal)/**/;
        /* Implementación */
    }
}