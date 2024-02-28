import {Global} from './Global'


export const GetProfile = async (userId, setState) => {
    const request = await fetch(`${Global.url}user/profile/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });

    const response = await request.json();

    if (response.status === 'success') {
        setState(response.user);
    }

    console.log(userProfile)
}