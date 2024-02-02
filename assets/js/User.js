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
            legal: ${true}
        }`;
    }

    isValid() {
        if(this.name/*Regex*/);
        if(this.email/*Regex*/);
        /* Implementación */
    }
}