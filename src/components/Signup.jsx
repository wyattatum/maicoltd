  import {useState} from "react";

import "./Signup.css";

function Signup(){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [errors, setErrors] = useState({});
    function validate() {
        const newErrors = {};

        if (!name.trim()) {
        newErrors.name = "Name is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
        newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
        }

        if (!password) {
        newErrors.password = "Password is required";
        } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    }
 
    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        }
         else {
        setErrors({});
        console.log("Form submitted:", { name, email, password });
        
        }

        //connect API
          try {
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.text(); // because backend sends string
    console.log("SERVER RESPONSE:", data);
    alert(data);

  } catch (error) {
    console.log("ERROR:", error);
    alert("Connection failed");
  }
        //end connect API
                
    }
  return (
    <form onSubmit={handleSubmit}>
      <h2>SIGNUP</h2>

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <br /> <br />

      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <br /> <br />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <br /> <br />

      <button type="submit">SIGNUP</button>
      
            <p className="link-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );

}

export default Signup;