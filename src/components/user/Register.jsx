import React from 'react'
import { useForm } from '../../hooks/useForm'
import {Global} from '../../helpers/Global'
import { useState } from 'react'

export const Register = () => {

  const {form, handleInputChange} = useForm({});
  const [saved, setSaved] = useState("not_sent");

  const saveUser = async (e) => {
    e.preventDefault();

    let newUser = form;

    const request = await fetch(`${Global.url}user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    });

    const response = await request.json();

    if (response.status === "success") {
      setSaved("saved");
    } else {
      setSaved("error");
    }


  }
  return (
    <>
      <header className="content__header content__header__public">
        <h1 className="content__title">Register</h1>
      </header>

      <div className="content__posts">
        {
          saved === "saved" ? <strong className='message__success'>User saved</strong> :
          saved === "error" ?  <strong className='message__error'>User not saved</strong> : ""
        }

        <form action="" className='register__form' onSubmit={saveUser}>
          <div className='form__group'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="" onChange={handleInputChange}/>
          </div>
          <div className='form__group'>
            <label htmlFor="surname">Last Name</label>
            <input type="text" name="surname" id="" onChange={handleInputChange}/>
          </div>
          <div className='form__group'>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="" onChange={handleInputChange}/>
          </div>
          <div className='form__group'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="" onChange={handleInputChange}/>
          </div>
          <div className='form__group'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" onChange={handleInputChange}/>
          </div>

          <input type="submit" value="Register" className='btn btn-success' />

        </form>
      </div>
    </>
  )
}
