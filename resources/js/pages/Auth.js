import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2';

export default function AppIndex () {
    const history = useHistory();
    const dispach = useDispatch();

    const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    const _token = window._token;

    const [email, setEmail] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [action, setAction] = useState('login');

    useEffect(() => {
    }, []);

    const login = async () => {
        if(!email || !password){
            Swal.fire({
                icon: 'warning',
                text: 'Insira usuário e senha.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        let timerInterval
        Swal.fire({
            title: 'Entrando...',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        });

        window.axios.post(`${host}/login`, { email, password, _token })
            .then(response => {
                if(response.data.user){
                    setTimeout(() => {
                         dispach({ type: 'AUTH_USER', auth: { user: response.data.user } });
                    }, 2100)
                } else {
                    Swal.fire({
                        icon: 'warning',
                        text: response.data.message,
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    text: 'Erro ao realizar login. Tente novamente.',
                    timer: 3000,
                    showConfirmButton: false
                });
            });
    }

    const register = async () => {
        if(!email || !password || !name || !password_confirmation){
            Swal.fire({
                icon: 'warning',
                text: 'Preencha todos os campos.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

         if(password !==password_confirmation){
            Swal.fire({
                icon: 'warning',
                text: 'Verifique os campos de senha.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

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
                            type="password"
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
                                <label htmlFor="password_confirmation" className="form-label">Confirme a senha</label>
                                <input 
                                    className="form-control" 
                                    id="password_confirmation"
                                    type="password"
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

                        <div className="row">
                            <div className="col-12 col-md-3">
                                <button 
                                    className="btn btn-primary mt-3" 
                                    onClick={action === 'login' ? login : register}
                                > 
                                    { action === 'login' ? 'Entrar' : 'Cadastre-se' }  
                                </button>
                            </div>

                            <div className="col-12 col-md-9">
                                {
                                    action === 'login' ? (
                                        <p className="mt-4">
                                            Não é usuário? 
                                            <a onClick={() => setAction('register')} className="btn btn-link"> Clique aqui </a>
                                            e cadastre-se.
                                        </p>
                                    ) : (
                                        <p className="mt-4">
                                            Já é cadastrado? 
                                            <a onClick={() => setAction('login')} className="btn btn-link"> Clique aqui </a> 
                                            para realizar login.
                                        </p>
                                    ) 
                                }  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
