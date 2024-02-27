import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { Global } from '../../helpers/Global'



export const People = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getUsers(1);
  }, []);


  const getUsers = async (nextPage = 1) => {

    setLoading(true);
    const request = await fetch(`${Global.url}user/list/${nextPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });

    const response = await request.json();



    if (response.status === 'success' && response.users) {

      let newUsers = response.users;

      if (users.length >= 1) {
        newUsers = [...users, ...response.users];
      }


      setUsers(newUsers);
      setLoading(false);
      setFollowing(response.userFollowing);

      if (users.length >= (response.total - response.users.length)) {
        setMore(false);
      }

    }


  }

  const nextPage = async () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  }


  return (
    <>
      <header className="content__header">
        <h1 className="content__title">People</h1>
        <button className="content__button">Show news</button>
      </header>

      <div className="content__posts">

        {loading && <p>Loading...</p>}
        {users.map((user, index) => {

          return (
            <article className="posts__post" key={user._id}>

              <div className="post__container">

                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Profile Picture" />}
                    {user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}

                  </a>
                </div>

                <div className="post__body">

                  <div className="post__user-info">
                    <a href="#" className="user-info__name">{user.name}</a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">{user.created_at}</a>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>

                </div>

              </div>


              <div className="post__buttons">

                {!following.includes(user._id) &&
                  <a href="#" className="post__button post__button__green">
                    Follow
                  </a>
                }


                {following.includes(user._id) &&
                  <a href="#" className="post__button">
                    Unfollow
                  </a>
                }





              </div>

            </article>)
        })}

      </div>
      {loading && <p>Loading...</p>}
      {more &&
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Show more people
          </button>
        </div>
      }

      <br />
    </>
  )
}
