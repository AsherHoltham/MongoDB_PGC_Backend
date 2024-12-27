import * as CryptoJS from 'crypto-js';

export class User {
    private _uname: string;
    private _password: string;
    private _email: string;
    private _trips: string[];

    constructor(uname: string, password: string, email: string, trips: string[] = []) {
        this._uname = uname;
        this._password = CryptoJS.SHA256(password).toString();
        console.log(this._password);
        this._email = email;
        this._trips = trips;
    }

    public getUname(): string {
        return this._uname;
    }

    public getEmail(): string {
        return this._email;
    }

    public toDB(): string {
        const obj = {   "_uname": this._uname,
                        "_password": this._password, 
                        "_email": this._email,
                        "_trips": this._trips
                    };

        const element = JSON.stringify(obj);
        return element;
    }

    public retIndexes(): string[] {
        return ["_uname", "_email"];
    }

    
};