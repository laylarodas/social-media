import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { GetProfile } from '../../helpers/GetProfile'
import { useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { PublicationList } from '../publication/PublicationList'

export const Profile = () => {

    const [user, setUser] = useState({});
    const [counters, setCounters] = useState({});
    const params = useParams();
    const { auth } = useAuth();
    const [iFollow, setIFollow] = useState(false);
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);


    const getDataUser = async () => {
        let dataUser = await GetProfile(params.userId, setUser);
        console.log(dataUser);
        if (dataUser.following && dataUser.following._id) {
            setIFollow(true);
        }

    }

    useEffect(() => {
        getDataUser();
        getCounters();
        getPublications(1, true);
    }, []);

    useEffect(() => {
        getDataUser();
        getCounters();
        setMore(true);
        getPublications(1, true);
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

        if (response.following) {
            setCounters(response);
        }
    }

    const follow = async (userId) => {

        const request = await fetch(`${Global.url}follow/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ followed: userId })
        });

        const response = await request.json();
        if (response.status === 'success') {
            setIFollow(true);
        }



    }

    const unfollow = async (userId) => {
        const request = await fetch(`${Global.url}follow/unfollow/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })

        const response = await request.json();

        if (response.status === 'success') {
            setIFollow(false);
        }


    }

    const getPublications = async (nextPage = 1, newProfile = false) => {
        const request = await fetch(Global.url + "publication/user/" + params.userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const response = await request.json();

        console.log(response);

        if (response.status === "success") {

            let newPublications = response.publications;
            
            if (!newProfile && publications.length >= 1) {
                newPublications = [...publications, ...response.publications];
            }

            if (newProfile) {
                newPublications = response.publications;
                setMore(true);
                setPage(1);
            }

            setPublications(newPublications);

            if (!newProfile && publications.length >= (response.total - response.publications.length)) {
                setMore(false);
            }

            if(response.pages <= 1){
                setMore(false);
            }
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
                            {user._id != auth._id &&
                                (iFollow ?
                                    <button className="content__button content__button--right post__button" onClick={() => unfollow(user._id)}>UnFollow</button>
                                    : <button className="content__button content__button--right" onClick={() => follow(user._id)}>Follow</button>
                                )
                            }

                        </div>
                        <h2 className="container-names__nickname">{user.username}</h2>
                        <p className="container-names__bio">{user.bio}</p>

                    </div>
                </div>
                <div className="profile-info__stats">

                    <div className="stats__following">
                        <Link to={'/social/following/' + user._id} className="following__link">
                            <span className="following__title">Following</span>
                            <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
                        </Link>
                    </div>
                    <div className="stats__following">
                        <Link to={'/social/followers/' + user._id} className="following__link">
                            <span className="following__title">Followers</span>
                            <span className="following__number">{counters.followers >= 1 ? counters.followers : 0}</span>
                        </Link>
                    </div>


                    <div className="stats__following">
                        <Link to={'/social/profile/' + user._id} className="following__link">
                            <span className="following__title">Publications</span>
                            <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                        </Link>
                    </div>


                </div>
            </header>


            <PublicationList
                publications={publications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
                getPublications={getPublications} 
            />
            

        </>
    )
}
