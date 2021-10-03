import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import moment from 'moment';

export default function AppIndex () {
    const history = useHistory();
    const dispach = useDispatch();

    const [email, setEmail] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [action, setAction] = useState('login');

    useEffect(() => {
    }, []);

    const login = async () => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const _token = window._token;

        window.axios.post(`${host}/login`, { email, password, _token })
            .then(response => {
                dispach({ type: 'AUTH_USER', auth: { user: response.data.user } });
            }).catch(error => {
                console.log(error);
            });
    }

    const register = async () => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const _token = window._token;

        window.axios.post(`${host}/register`, { email, password, name, password_confirmation, _token })
            .then(response => {
                dispach({ type: 'AUTH_USER', auth: { user: response.data.user } });
            }).catch(error => {
                console.log(error);
            });
    }

    const bodyPage = (url) => {
        history.push(`/url/${url.id}`);
    }

    return (
        <div className="row mx-2">
             <div className="col-6 offset-3" style={{marginTop: '100px'}}>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <p className="fs-5"> Entrar </p>
                        </div>

                        { action == 'register' && (
                            <>
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input 
                                    className="form-control" 
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </>
                        ) }

                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            className="form-control" 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <label htmlFor="password" className="form-label">Senha</label>
                        <input 
                            className="form-control" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            onKeyPress={(e) => {
                                if (e.charCode == 13) {
                                    login();
                                }
                            }}
                        />

                        { action == 'register' && (
                            <>
                                <label htmlFor="password_confirmation" className="form-label">Senha</label>
                                <input 
                                    className="form-control" 
                                    id="password_confirmation"
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    value={password_confirmation}
                                    onKeyPress={(e) => {
                                        if (e.charCode == 13) {
                                            register();
                                        }
                                    }}
                                />
                            </>
                        ) }

                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={action === 'login' ? login : register}
                        > 
                            { action === 'login' ? 'Entrar' : 'Salvar' }  
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
