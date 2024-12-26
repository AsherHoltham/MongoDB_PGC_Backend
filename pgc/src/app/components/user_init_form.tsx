"use client"
export const RegisterForm = () => {
    console.log("USER INIT Form Component")
    return (
        <div>
            <form>
                <label>Create a Username:</label>
                <br />
                <input type="text" id="initusername" name="initusername" required  placeholder="Create a Username" ></input>
            </form>
            <form>
                <label>Enter Your Email:</label>
                <br />
                <input type="text" id="email" name="email" required  placeholder="Enter Email" ></input>
            </form>
            <form>
                <label>Create Password:</label>
                <br />
                <input type="text" id="initpassword" name="initpassword" required  placeholder="Create Password" ></input>
            </form>
        </div>
    );
}