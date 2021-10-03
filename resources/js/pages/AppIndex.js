import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import moment from 'moment';
import Swal from 'sweetalert2';

export default function AppIndex () {
    const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    const _token = window._token;

    const history = useHistory();
    const dispach = useDispatch();

    const [urls, setUrls] = useState([]);
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        loadUrls();
        
        setInterval(() => loadUrls(), 5000)
    }, []);

    const loadUrls = async (paginationPage = 1) => {
        setPage(1);

        window.axios.get(`${host}/urls?page=${paginationPage}`)
            .then(response => {
                setUrls([]);

                setUrls(response.data.data);
                setLastPage(response.data.last_page);
            }).catch(error => {
                console.log(error);
            });
    }

    const storeUrl = async () => {
        window.axios.post(`${host}/urls`, { url, method, _token })
            .then(response => {
                loadUrls();
                setUrl('');
                Swal.fire({
                    icon: 'success',
                    text: 'Url cadastrada',
                    timer: 3000,
                    showConfirmButton: false
                });
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Url inválida',
                    text: 'Verifique o formato da Url',
                    timer: 3000
                });
            });
    }

    const deleteUrl = async (url) => {
        Swal.fire({
            icon: 'question',
            text: `Excluir ${url.url} ?`,
            confirmButtonText: 'Sim!',
            cancelButtonText: 'Não',
            confirmButtonColor: '#ed1818',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.axios.delete(`${host}/urls/${url.id}`, { _token })
                    .then(response => {
                        loadUrls(page);
                    }).catch(error => {
                        console.log(error);
                    });
            }
        });
    }

    const dateFormat = (date) => {
        return date ? moment(date).format('DD/MM/YYYY-HH:mm') : '';
    }

    const bodyPage = (url) => {
        history.push(`/url/${url.id}`);
    }

    const next = async () => {
        let atualPage = page + 1;
        if(atualPage <= lastPage){
            setPage(await atualPage);
            loadUrls(await atualPage);
        }
    }

    const previous = async () => {
        let atualPage = page - 1;
        if(atualPage > 0){
            setPage(await atualPage);
            loadUrls(await atualPage);
        }
    }

    return (
        <div className="row mx-2">
             <div className="col-12 col-md-4 mt-2">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <p className="fs-5"> Formulário para cadastro </p>
                        </div>

                        <label htmlFor="url" className="form-label">Url</label>
                        <input 
                            className="form-control" 
                            id="url"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            onKeyPress={(e) => {
                                if (e.charCode == 13) {
                                    storeUrl();
                                }
                            }}
                        />

                        <label htmlFor="method" className="form-label">Url</label>
                        <select 
                            className="form-select" 
                            aria-label="Default select example" 
                            id="method"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="PATCH">PATCH</option>
                            <option value="DELETE">DELETE</option>
                        </select>

                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={storeUrl}
                        > 
                            Cadastrar 
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-8 mt-2">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <p className="fs-5"> Urls Cadastradas </p>
                        </div>


                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" aria-label="Previous" onClick={previous}>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" aria-label="Next" onClick={next}>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">HTTP Metodo</th>
                                    <th scope="col">Url</th>
                                    <th scope="col">Data de rastreio</th>
                                    <th scope="col">Status Code</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { urls.map(url => (
                                    <tr key={url.id}>
                                        <td>{url.method}</td>
                                        <td>
                                            <a href={url.url}>
                                                {url.url}
                                            </a>
                                        </td>
                                        <td>{dateFormat(url.date_access)}</td>
                                        <td>{url.status_code}</td>
                                        <td>
                                            <button 
                                                className={`btn ${url.status_code === 200 ? 'btn-primary' : 'disabled'}`} 
                                                onClick={() => url.status_code === 200 ? bodyPage(url) : () => {}}
                                            > 
                                                {url.status_code === 200 && 'Resposta'}
                                            </button>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => deleteUrl(url)}
                                            > 
                                                Deletar 
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
