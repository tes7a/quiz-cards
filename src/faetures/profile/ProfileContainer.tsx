import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoginUserInfo} from "../../api/authAPI";
import {AppRootStateType} from "../../app/store";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../routes/routes";
import {useEffect} from "react";
import {Profile} from "./Profile";
import {logoutTC, ProfileInfo} from "../../api/AuthReducer";

export const ProfileContainer = () => {
    const user = useSelector<AppRootStateType, LoginUserInfo | null>(state => state.auth.user);
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);
    const error: string = useSelector<AppRootStateType, string>(state => state.auth.error);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutTC());
    }

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(ProfileInfo())
        }
    }, [dispatch])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    if (user != null) {
        return <div>
            <Profile user={user}/>
            <span>Пользователь авторизован!</span>
            <button onClick={logout}>LogOut
            </button>
        </div>
    } else {
        return <div>{error}</div>
    }
}