"use client"
export const LoginForm = () => {
    console.log("Login Form Component")
    return (
        <div>
            <form>
                <label>Username: </label>
                <input type="text" id="username" name="username" required  placeholder="Enter username" ></input>
            </form>
            <form>
                <label>Password: </label>
                <input type="text" id="password" name="password" required  placeholder="Enter password" ></input>
            </form>
        </div>
    );
}