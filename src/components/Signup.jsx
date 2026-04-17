import {useState} from "react";

import "./Signup.css";

function Signup(){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    function handleSubmit(e){
        e.preventDefault();
        console.log(name,email,password);
    }


    return(
        <form onSubmit={handleSubmit}>
             <h2>SIGNUP</h2>
             <input 
             type="text"
             placeholder="name"
             value={name}
             onChange={(e)=>setName(e.target.value)}
             />  <br />  <br />

             <input 
             type="text"
             placeholder="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             /> <br /> <br />

             <input 
             type="password"
             placeholder="password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             /> <br /> <br />
             <button type="submit">SIGNUP</button>
        </form>
    );
}

export default Signup;