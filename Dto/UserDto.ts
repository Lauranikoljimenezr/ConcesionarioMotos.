class User {
    email: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    domicilio: string
    constructor(
        email: string, name: string,
        lastName: string, phoneNumber: string,
        password: string,domicilio:string
    ) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.domicilio=domicilio
    }
}

export default User;