import { ObjectId } from 'mongodb'

export class User {
    private _uname: string;
    private _password: string;
    private _email: string;
    private _trips: ObjectId[];
    private _verified: boolean;
    private _verificationCode: string;

    constructor(uname: string, password: string, email: string, 
        trips: ObjectId[] = [], verified: boolean = false, verificationCode: string = '') 
    {
        const code: string = this.generateVerificationCode();
        this._uname = uname;
        this._password = password;
        console.log(this._password);
        this._email = email;
        this._trips = trips;
        this._verified = verified;
        if(verificationCode === ''){
            this._verificationCode = code;
        } else {
            this._verificationCode = verificationCode;
        }
    }

    public getUname(): string {
        return this._uname;
    }

    public getEmail(): string {
        return this._email;
    }

    public getPasswordHash(): string {
        return this._password;
    }   

    public getVerificationStatus(): boolean {
        return this._verified;
    }

    public getVerificationCode(): string {
        return this._verificationCode;
    }

    public updateVerificationStatus() {
        this._verified = true;
        this._verificationCode = "__0__";
    }

    public toDB(): Record<string, any> {
        return {
          "_uname": this._uname,
          "_password": this._password,
          "_email": this._email,
          "_trips": this._trips,
          "_verified": this._verified.toString(),
          "_verificationCode": this._verificationCode
        };
      }

    public retIndexes(): string[] {
        return ["_uname", "_email"];
    }

    private generateVerificationCode(length: number = 6): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
          code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    static fromJSON(userJSON: any): User {
        return new User(
          userJSON.uname,
          userJSON.password,
          userJSON.email,
          userJSON.trips || [],
          userJSON.verified || false,
          userJSON.verificationCode || ''
        );
    }
};