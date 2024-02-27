import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import {Global} from '../../helpers/Global'

export const Config = () => {

    const [saved, setSaved] = useState("not_sent");
    const { auth } = useAuth();

    const updateUser = (e) => {
        e.preventDefault();
        console.log(auth);
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
                        <input type="text" name="name" id="" defaultValue={auth.name} />
                    </div>
                    <div className='form__group'>
                        <label htmlFor="surname">Last Name</label>
                        <input type="text" name="surname" id="" defaultValue={auth.surname} />
                    </div>
                    <div className='form__group'>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="" defaultValue={auth.username} />
                    </div>
                    <div>
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" id="" defaultValue={auth.bio} />
                    </div>
                    <div className='form__group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="" defaultValue={auth.email} />
                    </div>
                    <div className='form__group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="file">Avatar</label>
                        <div className="general-info__container-avatar">
                            {auth.image != "default.png" && <img src={Global.url + "user/avatar/"+auth.image} className="container-avatar__img" alt="Profile Picture" />}
                            {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                        </div>
                        <br />
                        <input type="file" name='file' id='file' />
                    </div>
                    <br />
                    <input type="submit" value="Register" className='btn btn-success' />

                </form>
            </div>
        </>
    )
}
