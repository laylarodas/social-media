import React from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

export const Login = () => {

  const { form, handleInputChange } = useForm({});
  const [saved, setSaved] = useState("not_sent");

  const {setAuth}= useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    const userToLogin = form;

    const request = await fetch(`${Global.url}user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userToLogin)
    });

    const response = await request.json();

    if (response.status === "success") {

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));


      setSaved("login");
      //set data in auth
      setAuth(response.user);

      setTimeout(() => {
        window.location.reload();
      }, 1000);






    } else {
      setSaved("error");
    }
  }
  return (
    <>
      <header className="content__header content__header__public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">

        {
          saved === "login" ? <strong className='message__success'>User loged</strong> :
            saved === "error" ? <strong className='message__error'>User not loged</strong> : ""
        }

        <form className="login__form" onSubmit={loginUser}>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleInputChange} />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleInputChange} />
          </div>

          <input type="submit" value="Login" className="btn btn-success" />
        </form>
      </div>
    </>
  )
}
