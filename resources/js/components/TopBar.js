import React from 'react';
import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <nav className="navbar navbar-light bg-primary mb-2">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"> Home </Link>
                <p className="my-auto"> Cred Pago </p>
                <p className="my-auto"> Sair </p>
            </div>
        </nav>
    );
}
