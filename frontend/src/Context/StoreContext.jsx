
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const StoreContext= createContext(null);

const StoreContextProvider=(props)=>{

    const url=`http://localhost:6500`;
    const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserEmail('');
    toast.success("Logged out!", { theme: "dark" });
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1050);
    
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
        userEmail,
        setToken,
        navigate,
        fetchExpData,
        expData,
        deleteExpData,
        loading,
        setLoading,
        handleLogout,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider; //make sure it wraps main.jsx
