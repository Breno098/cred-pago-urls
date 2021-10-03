import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export default function TopBar() {
    const dispach = useDispatch();

    const logout = async () => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const _token = window._token;

        window.axios.get(`${host}/logout`, { _token })
            .then(response => {
                dispach({ type: 'AUTH_USER', auth: null});
                location.reload();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <nav className="navbar navbar-light bg-primary mb-2">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"> Home </Link>
                <p className="my-auto"> Cred Pago </p>
                <button className="my-auto btn" onClick={logout}> Sair </button>
            </div>
        </nav>
    );
}
