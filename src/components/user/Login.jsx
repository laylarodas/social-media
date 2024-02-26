import React from 'react'

export const Login = () => {
  return (
    <>
      <header className="content__header content__header__public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">
        <form className="login__form">
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>

          <input type="submit" value="Login" className="btn btn-success" />
        </form>
      </div>
    </>
  )
}
