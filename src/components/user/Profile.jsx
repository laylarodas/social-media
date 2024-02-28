import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { GetProfile } from '../../helpers/GetProfile'
import { useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import { Link } from 'react-router-dom'

export const Profile = () => {

    const [user, setUser] = useState({});
    const [counters, setCounters] = useState({});
    const params = useParams();

    useEffect(() => {
        GetProfile(params.userId, setUser)
        getCounters();
    }, []);

    useEffect(() => {
        GetProfile(params.userId, setUser);
        getCounters();
    }, [params]);

    const getCounters = async () => {
        const request = await fetch(Global.url + "user/counters/" + params.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const response = await request.json();

        if(response.following){
            setCounters(response);
        }
    }

    return (
        <>

            <header className='aside__profile-info'>

                <div className="profile-info__general-info">

                    <div className="general-info__container-avatar">
                        {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="container-avatar__img" alt="Profile Picture" />}
                        {user.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                    </div>

                    <div className="general-info__container-names">
                        <div className="container-names__name">
                            <h1>{user.name} {user.surname}</h1>
                            <button className="content__button content__button--right">Follow</button>
                        </div>
                        <h2 className="container-names__nickname">{user.username}</h2>
                        <p className="container-names__bio">{user.bio}</p>

                    </div>
                </div>
                <div className="profile-info__stats">

                    <div className="stats__following">
                        <Link to={'/social/following/'+ user._id} className="following__link">
                            <span className="following__title">Following</span>
                            <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
                        </Link>
                    </div>
                    <div className="stats__following">
                        <Link to={'/social/followers/'+ user._id} className="following__link">
                            <span className="following__title">Followers</span>
                            <span className="following__number">{counters.followers >= 1 ? counters.followers : 0}</span>
                        </Link>
                    </div>


                    <div className="stats__following">
                        <Link to={'/social/profile/'+ user._id} className="following__link">
                            <span className="following__title">Publications</span>
                            <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                        </Link>
                    </div>


                </div>
            </header>





            <div className="content__posts">

                <article className="posts__post">

                    <div className="post__container">

                        <div className="post__image-user">
                            <a href="#" className="post__image-link">
                                <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                            </a>
                        </div>

                        <div className="post__body">

                            <div className="post__user-info">
                                <a href="#" className="user-info__name">Layla Rodas</a>
                                <span className="user-info__divider"> | </span>
                                <a href="#" className="user-info__create-date">1 hour ago</a>
                            </div>

                            <h4 className="post__content">Hello, good morning!</h4>

                        </div>

                    </div>


                    <div className="post__buttons">

                        <a href="#" className="post__button">
                            <i className="fa-solid fa-trash-can"></i>
                        </a>

                    </div>

                </article>

            </div>

            <div className="content__container-btn">
                <button className="content__btn-more-post">
                    Show more publications
                </button>
            </div>
        </>
    )
}
