import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { UserList } from '../user/UserList'
import { useParams } from 'react-router-dom';
import { GetProfile } from '../../helpers/GetProfile';


export const Followers = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState([]);
    const [userProfile, setUserProfile] = useState({});

    const params = useParams();

    useEffect(() => {
        getUsers(1);
        GetProfile(params.userId, setUserProfile);
    }, []);


    const getUsers = async (nextPage = 1) => {

        setLoading(true);

        const userId = params.userId;


        const request = await fetch(`${Global.url}follow/followers/${userId}/${nextPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        const response = await request.json();

        let cleanUsers = [];

        response.follows.forEach(follow => {
            cleanUsers = [...cleanUsers, follow.user];
        })
        response.users = cleanUsers;
        console.log(response.users);


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




    return (
        <>
            <header className="content__header">
                <h1 className="content__title">{userProfile.name} {userProfile.surname}, my followers</h1>
                <button className="content__button">Show news</button>
            </header>

            <UserList users={users}
                getUsers={getUsers}
                following={following}
                setFollowing={setFollowing}
                loading={loading}
                more={more}
                page={page}
                setPage={setPage}
            />


            <br />
        </>
    )
}
