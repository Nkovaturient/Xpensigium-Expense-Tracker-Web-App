
import axios from 'axios';
import { signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, provider } from '../firebase';

export const StoreContext= createContext(null);

const StoreContextProvider=(props)=>{

    const url=`https://xpensigium-backend.onrender.com`; //http://localhost:6500
    const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const[photoUrl, setPhotoUrl]=useState('');
  const[token, setToken]=useState("");
  const[loading, setLoading]=useState(false);
  const [userData, setUserData] = useState({});
  const[expData, setExpData]=useState([]);



  const fetchExpData=async()=>{
    try{
        setLoading(true);
        const response=await axios.post(`${url}/api/expense/`);
        setLoading(false);
        if(response.data.success){
            setExpData(response.data.message);
            // toast.success('Fetched Expenses Data', { theme: 'dark'});
        } else {
            toast.error('Server Error', { theme: 'dark'});
        }

    }catch(err){
        setLoading(false);
        toast.error(`${err.message}`, { theme: 'dark'});
    }
  }

  const handleGoogleSignIn=async()=>{

    setLoading(true);
    await signInWithPopup(auth, provider)
  .then((result) => {
    setLoading(false);
    // const credential = provider.credentialFromResult(result);
    // console.log("credential=", credential);
    // const token = credential.accessToken;
    const user = result.user;
  const { email, displayName, photoURL, refreshToken}=user
  
  setUserData(user);
  setPhotoUrl(photoURL);
  setToken(refreshToken || token);
 setUserEmail(email);

    console.log("user=", userData);
    toast.success("Registered Successfully!", {
      position: "top-left",
      theme: "dark",
    });

  }).catch((error) => {

    setLoading(false);
    toast.error(`${error.message}`, {
      position: "top-left",
      autoClose: 5000,
      theme: "dark",
    });
  });
  }

  const handleLogout = async() => {
    
    await signOut(auth).then(() => {
      setToken(localStorage.removeItem("token"));
      setUserEmail('');
      toast.success("Logged out!", { theme: "dark" });
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    }).catch((error) => {
      toast.error(`${error.message}`, { theme: "dark" });
    });
    
    
  };

  const deleteExpData=async(id)=>{
    if(!token){
        toast.error(`Kindly Login before making any changes!`, { theme: "dark" });
      navigate("/login");
    } else {
      try{
        setLoading(true);
        const response=await axios.delete(`${url}/api/expense/delete/${id}`);
        setLoading(false);
        if(response.data.success){
            toast.success('Deleted Expense successfully!', { theme: 'dark'});
            await fetchExpData();
            setTimeout(()=>{
              navigate('/');
            }, 1000);
        } else {
            setLoading(false);
            toast.error('Server Error', { theme: 'dark'});
        }

    }catch(err){
        toast.error(`${err.message}`, { theme: 'dark'});
    }
    }
    
  }

  useEffect(()=>{
    fetchExpData();
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
    } 

  }, [])


    const contextValue={
        userData,
        setUserData,
        url,
        token,
        setUserEmail,
        photoUrl,
        userEmail,
        setToken,
        navigate,
        fetchExpData,
        expData,
        deleteExpData,
        loading,
        setLoading,
        handleGoogleSignIn,
        handleLogout,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider; //make sure it wraps main.jsx
