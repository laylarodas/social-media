import React from 'react'
import { createContext } from 'react'
import { useState, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [shared, setShared] = useState("info shared from AuthProvider")
  return (
    <AuthContext.Provider value={{shared}}>
        {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;