import { ObjectId } from 'mongodb'

export class Trip {
    private _title: string;
    private _shareCode: string;
    private _location: string;
    private _hostUser: ObjectId;
    private _users: ObjectId[];

    constructor(title: string, code: string, location: string, 
        host: ObjectId, users: ObjectId[]) 
    {
        this._title = title;
        this._shareCode = code;
        this._location = location;
        this._hostUser = host;
        this._users = users;
    }

    public getTitle(): string {
        return this._title;
    }

    public getCode(): string {
        return this._shareCode;
    }

    public getLocation(): string {
        return this._location;
    }

    public toDB(): Record<string, any> {
        return {
          "_title": this._title,
          "_shareCode": this._shareCode,
          "_location": this._location,
          "_hostUser": this._hostUser,
          "_users": this._users,
        };
      }

    public retIndexes(): string[] {
        return ["_shareCode"];
    }

    static fromJSON(userJSON: any): Trip {
        return new Trip(
          userJSON._title,
          userJSON._shareCode,
          userJSON._location,
          userJSON._hostUser,
          userJSON._users || [],
        );
    }
};
