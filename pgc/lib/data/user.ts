import * as CryptoJS from 'crypto-js';

class User {
    private _uname: string;
    private _password: string;
    private _email: string;
    private _trips: string[];

    constructor(uname: string, password: string, email: string, trips: string[]) {
        this._uname = uname;
        this._password = CryptoJS.SHA256(password).toString();
        console.log(this._password);
        this._email = email;
        this._trips = trips;
    }

    public toDB(): string {
        const obj = {   "password": this._password, 
                        "email": this._email,
                        "trips": this._trips
                    };

        const element = JSON.stringify(obj);
        return element;
    }

    public uname(): string {
        return this._uname;
    }
};