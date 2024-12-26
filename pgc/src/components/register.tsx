"use client"
import { User } from "../../lib/data/user";

export const RegisterForm = () => {
    console.log("USER INIT Form Component")
    return (
        <div>
            <form method="GET">
                <div>
                    <label>Create a Username:</label>
                    <br />
                    <input type="text" id="uname" name="uname" required  placeholder="Create a Username" ></input>
                </div>
                <div>
                    <label>Enter Your Email:</label>
                    <br />
                    <input type="text" id="email" name="email" required  placeholder="Enter Email" ></input>
                </div>
                <div>
                    <label>Create Password:</label>
                    <br />
                    <input type="text" id="password" name="password" required  placeholder="Create Password" ></input>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md" type="submit" style={{ marginTop: "2rem" }}>
                    Submit 
                </button>
            </form>

        </div>
    );
}