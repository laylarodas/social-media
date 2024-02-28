import React, { useState } from 'react'
import avatar from '../../../assets/img/user.png'
import useAuth from '../../../hooks/useAuth'
import { Global } from '../../../helpers/Global';
import { Link } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';


export const Sidebar = () => {

    const { auth, counters } = useAuth();
    const {form, handleInputChange} = useForm({});
    const [stored, setStored] = useState("not-stored");

    const token = localStorage.getItem("token");

    const savePost = async (e) => {
        e.preventDefault();
        
        let newPost = form;

        newPost.user = auth._id;

        const request = await fetch(Global.url + "publication/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newPost)
        });


        const response = await request.json();
   
        if(response.status === "success"){
            setStored("stored");
        }else{
            setStored("error");
        }

        const fileInput = document.getElementById("file");

        if(response.status === "success" && fileInput.files[0]){
       
            const formData = new FormData();
            formData.append("file", fileInput.files[0]);
       

            const uploadRequest = await fetch(Global.url + "publication/upload/" + response.publication._id, {
                method: "POST",
                headers: {
                    "Authorization": token
                },
                body: formData
            });

            const uploadResponse = await uploadRequest.json();
            console.log(response);

            if(uploadResponse.status === "success"){
                setStored("stored");
            }else{
                setStored("error");
            }

            if(uploadResponse.status === "success" && response.status == "success"){
                const myForm = document.getElementById("publication-id");myForm.reset();
            }

        }

    }
    return (
        <aside className="layout__aside">

            <header className="aside__header">
                <h1 className="aside__title">Hello, {auth.name}</h1>
            </header>

            <div className="aside__container">

                <div className="aside__profile-info">

                    <div className="profile-info__general-info">

                        <div className="general-info__container-avatar">
                            {auth.image != "default.png" && <img src={Global.url + "user/avatar/"+auth.image} className="container-avatar__img" alt="Profile Picture" />}
                            {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                        </div>

                        <div className="general-info__container-names">
                            <Link to={'/social/profile/' + auth._id} className="container-names__name">{auth.name} {auth.surname}</Link>
                            <p className="container-names__nickname">{auth.username}</p>
                        </div>
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <Link to={'following/'+ auth._id} className="following__link">
                                <span className="following__title">Following</span>
                                <span className="following__number">{counters.following}</span>
                            </Link>
                        </div>
                        <div className="stats__following">
                            <Link to={'followers/'+ auth._id} className="following__link">
                                <span className="following__title">Followers</span>
                                <span className="following__number">{counters.followers}</span>
                            </Link>
                        </div>


                        <div className="stats__following">
                            <Link to={'/social/profile/' + auth._id} className="following__link">
                                <span className="following__title">Publications</span>
                                <span className="following__number">{counters.publications}</span>
                            </Link>
                        </div>


                    </div>
                </div>


                <div className="aside__container-form">

                {
                    stored === "stored" ? <strong className='message__success'>Successfully posted</strong> :
                    stored === "error" ? <strong className='message__error'>Not posted</strong> : ""
                }

                    <form className="container-form__form-post" id='publication-id' onSubmit={savePost}>

                        <div className="form-post__inputs">
                            <label htmlFor="text" className="form-post__label">What are you thinking today?</label>
                            <textarea name="text" className="form-post__textarea" onChange={handleInputChange}/>
                        </div>

                        <div className="form-post__inputs">
                            <label htmlFor="file" className="form-post__label">Upload your image</label>
                            <input type="file" name="file" id="file" className="form-post__image" />
                        </div>

                        <input type="submit" value="Send" className="form-post__btn-submit" />

                    </form>

                </div>

            </div>

        </aside>
    )
}
