import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import useAuth from '../../../hooks/useAuth'

export const PrivateLayout = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>
  } else {
    return (
      <>
        {/* LAYOUT */}
        <Header />

        <section className="layout__content">
          {auth._id ? <Outlet />
            : <Navigate to="/login" />
          }
        </section>

        {/* SIDEBAR */}
        <Sidebar />
      </>
    )
  }
}
