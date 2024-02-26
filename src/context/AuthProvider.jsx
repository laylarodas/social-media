import React from 'react'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { Global } from '../helpers/Global'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState({});

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if(!token || !user){
      return false
    }

    const userObj = JSON.parse(user);
    const userId = userObj.id;

    const request = await fetch(`${Global.url}user/profile/${userId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })

    const data = await request.json();

    setAuth(data.user);

  };



  return (
    <AuthContext.Provider value={{
      auth,
      setAuth
    }}>
        {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;