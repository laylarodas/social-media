import React from 'react'
import { Global } from '../../helpers/Global'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import avatar from '../../assets/img/user.png'
import { Link } from 'react-router-dom'

export const UserList = ({ users, getUsers, following, setFollowing, loading, more, page, setPage }) => {

    const { auth } = useAuth();


    const nextPage = async () => {
        let next = page + 1;
        setPage(next);
        getUsers(next);
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
            setFollowing([...following, userId]);
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
            let filterFollowings = following.filter(followingUserId => userId !== followingUserId);

            setFollowing(filterFollowings);
        }


    }
    return (
        <>
            <div className="content__posts">

                {loading && <p>Loading...</p>}
                {users.map((user, index) => {

                    return (
                        <article className="posts__post" key={user._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={"/social/profile/" + user._id} className="post__image-link">
                                        {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Profile Picture" />}
                                        {user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}

                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <Link to={"/social/profile/" + user._id} className="user-info__name">{user.name}</Link>
                                        <span className="user-info__divider"> | </span>
                                        <Link to={"/social/profile/" + user._id} className="user-info__create-date">{user.created_at}</Link>
                                    </div>

                                    <h4 className="post__content">{user.bio}</h4>

                                </div>

                            </div>

                            {user._id != auth._id &&
                                <div className="post__buttons">

                                    {!following.includes(user._id) &&
                                        <button className="post__button post__button__green" onClick={() => follow(user._id)}>
                                            Follow
                                        </button>
                                    }


                                    {following.includes(user._id) &&
                                        <button className="post__button" onClick={() => unfollow(user._id)}>
                                            Unfollow
                                        </button>
                                    }

                                </div>
                            }
                        </article>)
                })}

            </div>
            {loading && <p>Loading...</p>}

            {
                more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Show more people
                    </button>
                </div>
            }
        </>

    )
}