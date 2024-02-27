import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="navbar__container-lists">

                <ul className="container-lists__menu-list">
                    <li className="menu-list__item">
                        <a href="#" className="menu-list__link">
                            <i className="fa-solid fa-house"></i>
                            <span className="menu-list__title">Home</span>
                        </a>
                    </li>

                    <li className="menu-list__item">
                        <a href="#" className="menu-list__link">
                            <i className="fa-solid fa-list"></i>
                            <span className="menu-list__title">Timeline</span>
                        </a>
                    </li>

                    <li className="menu-list__item">
                        <a href="#" className="menu-list__link">
                            <i className="fa-solid fa-user"></i>
                            <span className="menu-list__title">People</span>
                        </a>
                    </li>

                </ul>

                <ul className="container-lists__list-end">
                    <li className="list-end__item">
                        <a href="#" className="list-end__link-image">
                            <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
                        </a>
                    </li>
                    <li className="list-end__item">
                        <a href="#" className="list-end__link">
                            <span className="list-end__name">User</span>
                        </a>
                    </li>
                    <li className="list-end__item">
                        <a href="#" className="list-end__link">
                            <i className="fa-solid fa-cog"></i>
                            <span className="list-end__name">Settings</span>
                        </a>
                    </li>
                    <li className="list-end__item">
                        <NavLink to="/social/logout" className="list-end__link">
                            <i className="fa-solid fa-sign-out"></i>
                            <span className="list-end__name">Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
    )
}
