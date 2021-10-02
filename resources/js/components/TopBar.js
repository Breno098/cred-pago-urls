import React from 'react';
import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <nav className="navbar navbar-light bg-primary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Pacientes</Link>
                <p className="my-auto">challenge</p>
            </div>
        </nav>
    );
}
