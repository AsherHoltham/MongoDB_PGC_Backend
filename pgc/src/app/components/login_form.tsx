"use client"
export const LoginForm = () => {
    console.log("Login Form Component")
    return (
        <div>
            <form>
                <label>Enter your Username:</label>
                <br />
                <input type="text" id="username" name="username" required  placeholder="Enter username" ></input>
            </form>
            <form>
                <label>Enter your Password:</label>
                <br />
                <input type="text" id="password" name="password" required  placeholder="Enter password" ></input>
            </form>
        </div>
    );
}