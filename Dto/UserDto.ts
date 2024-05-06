import internal from "stream";
class User {
    private _email: string;
    private _name: string;
    private _lastName: string;
    private _phoneNumber: string;
    private _password: string;
    private _domicilio: string
    constructor(
        email: string, name: string,
        lastName: string, phoneNumber: string,
        password: string,domicilio:string
    ) {
        this._email = email;
        this._name = name;
        this._lastName = lastName;
        this._phoneNumber = phoneNumber;
        this._password = password;
        this._domicilio=domicilio
    }
    get email(): string{
        return this._email
    }
    get name(): string{
        return this._name
    }
    get lastName(): string{
        return this._lastName
    }
    get phoneNumber(): string{
        return this._phoneNumber
    }
    get password(): string{
        return this._password
    }
    get domicilio(): string{
        return this._domicilio
    }
    set email(email:string){
        this._email = email
    }
    set name(name:string){
        this._name = name
    }
    set lastName(lastName:string){
        this._lastName = lastName
    }
    set phoneNumber(phoneNumber:string){
        this._phoneNumber = phoneNumber
    }
    set password(password:string){
        this._password = password
    }
    set domicilio(domicilio:string){
        this._domicilio = domicilio
    }

}

export default User;