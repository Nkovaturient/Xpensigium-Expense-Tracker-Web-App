import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase";
import { StoreContext } from "../../Context/StoreContext";
import Spinner from "../Spinner";

const Login = () => {
  const { setUserData, handleGoogleSignIn, setToken, navigate, loading, setLoading, setUserEmail } =
    useContext(StoreContext);

  
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleFirebaseLogin = async (e) => {
    e.preventDefault();

    const userEmail = inputValue.email;
    const userPassword = inputValue.password;

    setLoading(true);
    await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const reloadUser = user.reloadUserInfo;
        // console.log(user);
        setUserData(reloadUser);
        const { accessToken, email } = user;
        setLoading(false);
        setUserEmail(email);
        localStorage.setItem("token", accessToken);
        setToken(accessToken);
        const extractUser = email.split("@")[0];
        toast.success(`Welcome back ${extractUser}!`, {
          position: "top-left",
          theme: "dark",
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message, {
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
     <button className="google-btn" onClick={handleGoogleSignIn}> Login with Google</button> 
    
   </div>
   <br />
  
   <p style={{textAlign: "center", fontWeight: '300'}}>OR</p>
   <hr />
   <br />
        <form onSubmit={handleFirebaseLogin}>
        <h2 className="text-center text-3xl">Login</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            New here?Register yourself by quick{" "}
            <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
