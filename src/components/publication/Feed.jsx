import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { PublicationList } from '../publication/PublicationList'

export const Feed = () => {

    const params = useParams();
    const { auth } = useAuth();
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);

    useEffect(() => {
        getPublications(1, true);
    }, []);

    const getPublications = async (nextPage = 1) => {
        const request = await fetch(Global.url + "publication/feed/" + nextPage, {
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
            
            if (publications.length >= 1) {
                newPublications = [...publications, ...response.publications];
            }

         

            setPublications(newPublications);

            if (publications.length >= (response.total - response.publications.length)) {
                setMore(false);
            }

            if(response.pages <= 1){
                setMore(false);
            }
        }
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button">Show news</button>
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
