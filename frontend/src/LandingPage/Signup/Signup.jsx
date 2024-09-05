import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import Spinner from "../Spinner";

const Signup = () => {
  const { setUserData, handleGoogleSignIn, setToken, navigate, loading, setLoading, setUserEmail } =
    useContext(StoreContext);

  const [inp, setInp] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(inp, name, "--", value);
    setInp({ ...inp, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = inp.email;
    const userPassword = inp.password;

    setLoading(true);
    await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        setUserData(user);
        const { accessToken, email } = user;
        localStorage.setItem("token", accessToken);
        setToken(accessToken);
        setUserEmail(email);
        setLoading(false);
        toast.success("Registered Successfully!", {
          position: "top-left",
          theme: "colored",
        });
        setInp({ ...inp, email: "", password: "", username: "" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`${error.message}`, {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
        });
      });
  };

  

  return (
    <div className="signup-page">
      <div className="form_container">
      {loading ? <Spinner /> : ""}
      <div style={{textAlign: "center"}} className="g-btn">
     <button className="google-btn" onClick={handleGoogleSignIn}>Signup with Google</button> 
    
   </div>
   <br />
  
   <p style={{textAlign: "center", fontWeight: '300'}}>OR</p>
   <hr />
   <br />
        
       
        <form onSubmit={handleSubmit}>
        <h2 className="text-center text-3xl "> Register</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={inp.email}
              placeholder="a good email &"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={inp.username}
              placeholder="your good name"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={inp.password}
              placeholder="with a strong password"
              onChange={handleOnChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
