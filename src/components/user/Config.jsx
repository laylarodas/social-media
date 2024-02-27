import React, { useState } from 'react'

export const Config = () => {

    const [saved, setSaved] = useState("not_sent");

    const updateUser = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <header className="content__header content__header__public">
                <h1 className="content__title">Settings</h1>
            </header>

            <div className="content__posts">
                {
                    saved === "saved" ? <strong className='message__success'>User saved</strong> :
                        saved === "error" ? <strong className='message__error'>User not saved</strong> : ""
                }

                <form action="" className='config__form' onSubmit={updateUser}>
                    <div className='form__group'>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id=""  />
                    </div>
                    <div className='form__group'>
                        <label htmlFor="surname">Last Name</label>
                        <input type="text" name="surname" id=""  />
                    </div>
                    <div className='form__group'>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id=""  />
                    </div>
                    <div className='form__group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id=""  />
                    </div>
                    <div className='form__group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id=""  />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="file">Avatar</label>
                        <div className='avatar'>

                        </div>
                        <input type="file" name='file' id='file' />

                    </div>
                    <br />
                    <input type="submit" value="Register" className='btn btn-success' />

                </form>
            </div>
        </>
    )
}
