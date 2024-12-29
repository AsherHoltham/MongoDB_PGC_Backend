/**
"use client"



export function VerifyUserForm() {

    console.log("Resgister Form Component")
    return (
        <div>
            <form onSubmit={ handleSubmit } method="GET">
                <div>
                    <label>Create a Username:</label>
                    <br />
                    <input type="text" id="uname" name="uname" 
                    value= { uname } onChange= { (e) => setUnameAction(e.target.value) } 
                    required  placeholder="Create a Username" ></input>
                </div>
                <div>
                    <label>Enter Your Email:</label>
                    <br />
                    <input type="email" id="email" name="email" 
                    value= { email } onChange= { (e) => setEmailAction(e.target.value) } 
                    required  placeholder="Enter Email" autoComplete="email"></input>
                </div>
                <div>
                    <label>Create Password:</label>
                    <br />
                    <input type="text" id="password" name="password" 
                    value= { password } onChange= { (e) => setPasswordAction(e.target.value) } 
                    required  placeholder="Create Password" ></input>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md" 
                type="submit" style={{ marginTop: "2rem" }}>
                Submit</button>
            </form>
        </div>
    );
}



 */
