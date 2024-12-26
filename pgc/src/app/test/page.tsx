import { User } from "../../../lib/data/user";

export default function TPage(){
    const usertest = new User("john_doe", "mysecretpassword", "john@example.com", ["trip1", "trip2"]);
    return(
        <div>
            <h1>{ usertest.uname() }</h1>
            <h2>{ usertest.toDB() }</h2>
        </div>
    );
}