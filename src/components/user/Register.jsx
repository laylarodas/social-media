import React from 'react'
import { useForm } from '../../hooks/useForm'

export const Register = () => {

  const {form, handleInputChange} = useForm({});

  const saveUser = (e) => {
    e.preventDefault();
    
    let newUser = form;
    console.log(newUser);

  }
  return (
    <>
      <header className="content__header content__header__public">
        <h1 className="content__title">Register</h1>
      </header>

      <div className="content__posts">
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
